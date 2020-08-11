require('dotenv').config();
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
    query: {
        cache: 2000,
        limit: 10,
        maxLimit: 100,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    routes: {
        deleteOneBase: {
            returnDeleted: true,
        },
    },
});

const express = require('express');

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
    console.error(reason);
});

process.on('uncaughtException', (reason) => {
    console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
    if (!cachedServer) {
        try {
            const expressApp = express();
            const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
            nestApp.use(eventContext());
            await nestApp.init();
            nestApp.enableCors();
            cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    cachedServer = await bootstrapServer();
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
