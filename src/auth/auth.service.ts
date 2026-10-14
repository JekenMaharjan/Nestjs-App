import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

// Temporary mock database
const fakeUsers = [
    { id: 1, username: 'Ram Kaji', password: 'ram@123' },
    { id: 2, username: 'Hari Gopal', password: 'hari@123' },
];

@Injectable()
export class AuthService {
    // Inject NestJS JWT service to generate tokens
    constructor(private jwtService: JwtService) {}

    validateUser({username, password}: AuthPayloadDto) {
        // Find user by username
        const findUser = fakeUsers.find((user) => user.username === username);

        if (!findUser) {
            return `${username} is not found`;
        }

        // Check if passwords match
        if (password === findUser.password) {
            // Strip out the password before generating the token for crucial security reason as the JWT tokens are not hidden or encrypted
            const { password, ...user } = findUser;

            // Generate and return a signed JWT token
            return this.jwtService.sign(user);
        }
    }
}
