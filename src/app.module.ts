import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Profile } from './profiles/entities/profile/profile.interface';

@Module({
    imports: [
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
    ],
    controllers: [AppController, CatsController],
    providers: [AppService],
})
export class AppModule { }
