import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

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
        return this.profileService.findAll();
    }

    // =========================================================

    // 2) GET /profiles/:id

    // Challenge 3: Solution
    @Get('test/:id')
    findProfile(@Param('id') id: string) {
        return { id };
    }

    // Challenge 4: Solution
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profileService.findOne(id);
    }

    // =========================================================

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

    // =========================================================
    
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
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return this.profileService.update(id, updateProfileDto);
    }

    // =========================================================
    
    // 5) DELETE /profiles/:id

    // Challenge 9: Solution
    @Delete('test/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeProfile(@Param('id') id:string) { }

    // Challenge 10: Solution
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id:string) { 
        this.profileService.remove(id);
    }
}
