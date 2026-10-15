import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Profile } from './profiles/entities/profile/profile.interface';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        // Rate Limiting - import ThrottlerModule to protect applications from brute-force attacks
        ThrottlerModule.forRoot([
            {
                name: 'short',
                ttl: 1000,  // time to live in milliseconds
                limit: 3  // the maximum number of requests within ttl
            },
            {
                name: 'medium',
                ttl: 1000 * 10,
                limit: 20
            },
            {
                name: 'long',
                ttl: 1000 * 60,
                limit: 100
            }
        ]),

        // Make the .env variables available everywhere in the app
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        // User forRootAsync to load env variables safely into TypeORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: Number(configService.get<string>('DB_PORT')),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                entities: [Profile],
                synchronize: true,
            }),
        }),
        ProfilesModule,
        AuthModule,
    ],
    controllers: [AppController, CatsController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,  // Makes the rate limiter active globally
        },
    ],
})
export class AppModule { }
