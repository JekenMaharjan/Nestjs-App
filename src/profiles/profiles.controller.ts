import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
    constructor(private profileService: ProfilesService) {}

    // 1) GET /profiles

    // Challenge 1: Solution
    @Get('test')
    find(@Query('location') location:string) {
        return [{ location }];
    }

    // Challenge 2: Solution
    @Get()
    findAll() {
        try {
            return this.profileService.findAll();
        } catch (error) {
            // Type Guard with 'instanceof Error'
            const message = error instanceof Error ? error.message : 'No Profiles';
            throw new NotFoundException(message);
        }
    }

    // ===========================================================================

    // 2) GET /profiles/:id

    // Challenge 3: Solution
    @Get('test/:id')
    findProfile(@Param('id') id: string) {
        return { id };
    }

    // Challenge 4: Solution
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) {
        try {
            return this.profileService.findOne(id);
        } catch (error) {
            // Type Guard with 'instanceof Error'
            const message = error instanceof Error ? error.message : 'Profile not found';
            throw new NotFoundException(message);
        }
    }

    // ===========================================================================

    // 3) POST /profiles

    // Challenge 5: Solution
    @Post('test')
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return {
            name: createProfileDto.name,
            description: createProfileDto.description,
        };
    }

    // Challenge 6: Solution
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profileService.create(createProfileDto);
    }

    // ===========================================================================
    
    // 4) PUT /profiles/:id

    // Challenge 7: Solution
    @Put('test/:id')
    updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return {
            id,
            ...updateProfileDto
        };
    }

    // Challenge 8: Solution
    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        try {
            return this.profileService.update(id, updateProfileDto);
        } catch (error) {
            // Type Guard with 'instanceof Error'
            const message = error instanceof Error ? error.message : 'Profile not found';
            throw new NotFoundException(message);
        }
    }

    // ===========================================================================
    
    // 5) DELETE /profiles/:id

    // Challenge 9: Solution
    @Delete('test/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeProfile(@Param('id') id:string) { }

    // Challenge 10: Solution
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id:UUID) { 
        try {
            return this.profileService.remove(id);
        } catch (error) {
            // Type Guard with 'instanceof Error'
            const message = error instanceof Error ? error.message : 'Profile not found';
            throw new NotFoundException(message);
        }
    }
}
