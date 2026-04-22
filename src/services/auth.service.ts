import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/env.config';
import { repositoryFactory, OrmType } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';

export class AuthService {
  private createAccessToken(user: any) {
    return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
  }

  private createRefreshToken(user: any) {
    return jwt.sign({ id: user.id, type: 'refresh' }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as any,
    });
  }

  async register(orm: OrmType, payload: any) {
    const userRepo = repositoryFactory.user(orm);
    const refreshRepo = repositoryFactory.refreshToken(orm);
    const sessionRepo = repositoryFactory.session(orm);

    const existingUser = await userRepo.findByEmail(payload.email);
    if (existingUser) throw new AppError('Email already in use', 400);

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await userRepo.create({ ...payload, password: hashedPassword });

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);
    const sessionToken = uuidv4();

    await refreshRepo.create({ userId: user.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) });
    await sessionRepo.create({ userId: user.id, sessionToken, expiresAt: new Date(Date.now() + env.SESSION_EXPIRES_IN * 1000) });

    return {
      user,
      accessToken,
      refreshToken,
      sessionToken,
    };
  }

  async login(orm: OrmType, payload: any) {
    const userRepo = repositoryFactory.user(orm);
    const refreshRepo = repositoryFactory.refreshToken(orm);
    const sessionRepo = repositoryFactory.session(orm);

    const user = await userRepo.findByEmail(payload.email);
    if (!user) throw new AppError('Invalid credentials', 401);

    const plainPassword = user.password || user.dataValues?.password;
    const isMatch = await bcrypt.compare(payload.password, plainPassword);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    const userData = user.dataValues || user;
    const accessToken = this.createAccessToken(userData);
    const refreshToken = this.createRefreshToken(userData);
    const sessionToken = uuidv4();

    await refreshRepo.create({ userId: userData.id, token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) });
    await sessionRepo.create({ userId: userData.id, sessionToken, expiresAt: new Date(Date.now() + env.SESSION_EXPIRES_IN * 1000) });

    logger.info('User login', { userId: userData.id, email: userData.email });

    return { accessToken, refreshToken, sessionToken };
  }

  async refresh(orm: OrmType, oldRefreshToken: string) {
    const refreshRepo = repositoryFactory.refreshToken(orm);
    const userRepo = repositoryFactory.user(orm);
    const existing = await refreshRepo.findByToken(oldRefreshToken);
    if (!existing) throw new AppError('Invalid refresh token', 401);

    let payload: any;
    try {
      payload = jwt.verify(oldRefreshToken, env.REFRESH_TOKEN_SECRET);
    } catch {
      throw new AppError('Refresh token expired or invalid', 401);
    }

    await refreshRepo.deleteByToken(oldRefreshToken);

    const user = await userRepo.findById(payload.id);
    const userData = user?.dataValues || user;
    if (!userData) throw new AppError('User not found for refresh token', 404);

    const newAccessToken = jwt.sign({ id: payload.id, role: userData.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });
    const newRefreshToken = jwt.sign({ id: payload.id, type: 'refresh' }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN as any,
    });

    await refreshRepo.create({ userId: payload.id, token: newRefreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) });

    logger.info('Refresh token rotated', { userId: payload.id });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(orm: OrmType, payload: { refreshToken?: string; sessionToken?: string }) {
    const refreshRepo = repositoryFactory.refreshToken(orm);
    const sessionRepo = repositoryFactory.session(orm);

    if (payload.refreshToken) await refreshRepo.deleteByToken(payload.refreshToken);
    if (payload.sessionToken) await sessionRepo.deleteBySessionToken(payload.sessionToken);

    logger.info('User logout', { sessionToken: payload.sessionToken });
  }
}
