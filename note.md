# NestJS Notes

## NestJS CLI commands

1. Install NestJS CLI

    ```bash
    npm i -g @nestjs/cli
    ```

2. Create new NestJS project

    ```bash
    nest new project-name
    ```

3. Run the application

    ```bash
    npm run start
    ```

    Or,

    ```bash
    npm run start:dev
    ```

    > This command watches files and whenever they change, recompilles and restarts the server.

4. Generate the Module

    ```bash
    nest g module <module-name>
    ```

5. Generate the Service

    ```bash
    nest g service <service-name>
    ```

6. Generate the Controller

    ```bash
    nest g controller <controller-name>
    ```

7. Generate full feature (Module + Controller + Service + DTOs + Entities) in one command

    ```bash
    nest g resource <component-name/resource-name>
    ```

8. Generate Guard

    ```bash
    nest g guard auth/roles
    ```

---

## Backend connection to frontend

1. Inside main.ts add this,

    ```js
    app.enableCors({
        origin: 'http://localhost:4200',
    });
    ```
