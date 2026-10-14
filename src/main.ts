import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    // Pass FastifyAdapter to create a Fastify-backed NestJS instance
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(), {
            routeConflictPolicy: { duplicate: 'error', shadow: 'warn' },
        }
    );

    app.useGlobalPipes(new ValidationPipe);

    app.enableCors({
        origin: 'http://localhost:4200', // Allow frontend angular
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // Explicitly allow methods since on fastify, a cross-origin PUT, PATCH, or DELETE is rejected
        credentials: true,
    });

    // '0.0.0.0' allows Fastify to accept connections from all network interfaces
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
