import bcrypt from 'bcryptjs';
import { repositoryFactory, OrmType } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';

export class UserService {
  private getRepository(orm: OrmType) {
    return repositoryFactory.user(orm);
  }

  async create(orm: OrmType, data: any) {
    const existing = await this.getRepository(orm).findByEmail(data.email);
    if (existing) throw new AppError('Email already in use', 400);

    data.password = await bcrypt.hash(data.password, 10);
    return this.getRepository(orm).create(data);
  }

  async findAll(orm: OrmType) {
    return this.getRepository(orm).findAll();
  }

  async findById(orm: OrmType, id: number) {
    const user = await this.getRepository(orm).findById(id);
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async update(orm: OrmType, id: number, data: any) {
    await this.findById(orm, id);
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return this.getRepository(orm).update(id, data);
  }

  async delete(orm: OrmType, id: number) {
    await this.findById(orm, id);
    await this.getRepository(orm).delete(id);
  }
}
