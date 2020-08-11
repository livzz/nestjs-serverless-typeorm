import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ServiceEntity } from '../entity/service.entity';
import { ServiceService } from './service.service';

@Crud({
  model: {
    type: ServiceEntity,
  }
})
@Controller('service')
export class ServiceController implements CrudController<ServiceEntity> {
  constructor(public service: ServiceService) { }
}
