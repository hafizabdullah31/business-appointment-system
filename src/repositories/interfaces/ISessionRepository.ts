import { IBaseRepository } from './IBaseRepository';

export interface ISessionRepository extends IBaseRepository<any> {
  findBySessionToken(sessionToken: string): Promise<any | null>;
  deleteBySessionToken(sessionToken: string): Promise<void>;
}
