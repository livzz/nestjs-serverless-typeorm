import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;
    if (connectionManager.has('default')) {
      options = connectionManager.get('default').options;
      if (process.env.NODE_ENV === 'LOCAL') {
        await connectionManager.get('default').close();
      }
    } else {
      options = {
        keepConnectionAlive: true,
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        entities: [__dirname + '/../entity/**.entity{.ts,.js}'],
        synchronize: true,
      } as TypeOrmModuleOptions;
    }
    return options;
  }
}