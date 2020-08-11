import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './service/service.module';
import { TypeOrmConfigService } from './config/database';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            inject: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
        ServiceModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
