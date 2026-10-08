import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController { 
    // Get all cats route
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

    // Add a cat route
    @Post()
    create(): string {
        return 'This action adds a new cat';
    }

    // Delete a cat route
    @Delete()
    delete(): string {
        return 'This action deletes a cat';
    }
}
