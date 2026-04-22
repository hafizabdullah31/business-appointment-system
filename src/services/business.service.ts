import { repositoryFactory, OrmType } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';

export class BusinessService {
  private getRepository(orm: OrmType) {
    return repositoryFactory.business(orm);
  }

  async create(orm: OrmType, data: any) {
    return this.getRepository(orm).create(data);
  }

  async findAll(orm: OrmType) {
    return this.getRepository(orm).findAll();
  }

  async findById(orm: OrmType, id: number) {
    const business = await this.getRepository(orm).findById(id);
    if (!business) throw new AppError('Business not found', 404);
    return business;
  }

  async update(orm: OrmType, id: number, data: any) {
    await this.findById(orm, id);
    return this.getRepository(orm).update(id, data);
  }

  async delete(orm: OrmType, id: number) {
    await this.findById(orm, id);
    await this.getRepository(orm).delete(id);
  }
}
