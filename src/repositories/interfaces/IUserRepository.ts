import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<any> {
  findByEmail(email: string): Promise<any | null>;
}
