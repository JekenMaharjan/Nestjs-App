# NestJS JWT Authentication

1. Generate auth resources (module, controller and service)

    ```bash
    nest g module auth

    nest g controller auth

    nest g service auth
    ```

2. Install dependencies

    ```bash
    npm i @nestjs/jwt @nestjs/passport passport passport-jwt passport-local
    ```

3. Create DTO (Data Transfer Object) folder with auth.dto to define the exact shape and structure of data for auth.

4. Import 'JwtModule' in auth.module.js as AuthService needs to use the JwtService to sign tokens using this.jwtService.sign(user).
    - secret: Cryptographic Key
    - signOptions: Token Rules

5. Inject NestJS JWT service to generate tokens in AuthService and create method to validate user.

6. Inject AuthService in AuthController to use its validation methods and handle POST request for login to return generated JWT token to the client.
