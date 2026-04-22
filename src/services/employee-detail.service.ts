import { repositoryFactory, OrmType } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';

export class EmployeeDetailService {
  private getRepository(orm: OrmType) {
    return repositoryFactory.employeeDetail(orm);
  }

  async create(orm: OrmType, data: any) {
    return this.getRepository(orm).create(data);
  }

  async findAll(orm: OrmType) {
    return this.getRepository(orm).findAll();
  }

  async findById(orm: OrmType, id: number) {
    const item = await this.getRepository(orm).findById(id);
    if (!item) throw new AppError('Employee detail not found', 404);
    return item;
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
