import { IBaseRepository } from './IBaseRepository';

export interface IRefreshTokenRepository extends IBaseRepository<any> {
  findByToken(token: string): Promise<any | null>;
  deleteByToken(token: string): Promise<void>;
}
