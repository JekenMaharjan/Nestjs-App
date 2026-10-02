import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private profileService: ProfilesService
    ) {}

    // 1) GET /profiles
    /*
        Challenge:
        1. Create a route to handle GET requests to our /profiles endpoint
        2. It should return an empty array
        3. Grab the query parameter 'location' and return an array with on profile object with its
        only property/value being the location
        
        Solution:
    */
    @Get('test')
    find(@Query('location') location:string) {
        return [{ location }];
    }

    // Get all profiles
    @Get()
    findAll() {
        return this.profileService.findAll();
    }

    // 2) GET /profiles/:id
    /*
        Challenge 1:
        1. Set up the route for returning a single profile
        2. It should take an ID param and return an object with that ID
        
        Solution:
    */
    @Get('test/:id')
    findProfile(@Param('id') id: string) {
        return { id };
    }

    /*
        Challenge 2:
        1. Create the service method in the 'profile.service.ts' file. It should take an ID and
        return a profile object.
        2. Change the controller method we set up for getting single profiles to call our newly
        created service method and return the result from that.

        Solution:
    */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profileService.findOne(id);
    }

    // 3) POST /profiles
    /*
        Challenge:
        1. Create a DTO File for our create route's body. Hook that up in the controller.
        2. The class should have 2 fields (name & description) which are both strings
        3. Return the body we're receiving back to the client
    */
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return {
            name: createProfileDto.name,
            description: createProfileDto.description,
        };
    }
    
    // 4) PUT /profiles/:id
    /*
        Challenge:
        1. Create a class named UpdateProfileDto in update-profile.dto.ts with both name and
        description as strings, and export that class.
        2. Create a route in profiles.controller.ts to handle a PUT request. It should take in an ID as
        a param, and a body with a name and description. Then, return an object with the id, name, and
        description as a response.
    */
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto
    ) {
        return {
            id,
            ...updateProfileDto
        };
    }
    
    // 5) DELETE /profiles/:id
    /*
        Challenge:
        1. Change HttpStatus.OK to use the proper property on HttpStatus that serves back a status code
        of 204 back to the client
    */
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id:string) { }
}
