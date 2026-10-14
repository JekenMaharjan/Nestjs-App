import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // Inject AuthService to use its validation methods
    constructor(private authService: AuthService) {}

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
