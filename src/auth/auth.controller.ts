import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    // Inject AuthService to use its validation methods
    constructor(private authService: AuthService) {}

    // Override default configuration for Rate limiting and duration
    @Throttle({
        short: { limit: 2, ttl: 1000 },  // Max 2 reqs per 1 sec
        medium: { limit: 5, ttl: 10000 },  // Max 5 reqs per 10 secs
    })  // 1 s = 1,000 ms
    // Handles POST requests at the '/auth/login' endpoint
    @Post('login')
    login(@Body() authPayloadDto: AuthPayloadDto) {
        // Call service to check credentials and generate JWT
        const user = this.authService.validateUser(authPayloadDto);

        // If credentials are wrong, throw a 401 Unauthorized error
        if (!user) throw new HttpException('Invalid Credentials', 401);

        // Return the generated JWT token to the client
        return user;
    }
}
