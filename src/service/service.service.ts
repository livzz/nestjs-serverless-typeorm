import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ServiceEntity } from '../entity/service.entity';

@Injectable()
export class ServiceService extends TypeOrmCrudService<ServiceEntity> {
  constructor(@InjectRepository(ServiceEntity) repo) {
    super(repo)
  }
}
