import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile/profile.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profilesRepository: Repository<Profile>,
    ) {}

    // Array of Objects profile
    private profiles: Profile [] = [
        {
            id: randomUUID(),
            name: 'Brianna Watts',
            description: `Looking for someone to merge with my heart. I'm a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let's commit to something beautiful together.`
        },
        {
            id: randomUUID(),
            name: 'Jasper Quinn',
            description: `Seeking a partnet in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciatee a good kernel panic every now and then.`
        },
        {
            id: randomUUID(),
            name: 'Leo Park',
            description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`
        },
    ];

    // Get all profiles from MySQL
    async findAll(): Promise<Profile[]> {
        return await this.profilesRepository.find();
    }

    // Get specific profile by ID from MySQL
    async findOne(id: string): Promise<Profile> {
        const matchingProfile = await this.profilesRepository.findOne({ where: { id } });

        // If matching profile is not found
        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} is not found!`);
        }

        return matchingProfile;
    }

    // Create a profile and save it to MySQL
    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        const createdProfile = this.profilesRepository.create(createProfileDto);
        return await this.profilesRepository.save(createdProfile);
    }

    // Update a profile in MySQL
    async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        const matchingProfile = await this.findOne(id);

        // If matching profile is not found
        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} is not found!`);
        }

        matchingProfile.name = updateProfileDto.name;
        matchingProfile.description = updateProfileDto.description;

        return await this.profilesRepository.save(matchingProfile);
    }

    // Delete a profile from MySQL
    async remove(id: string): Promise<void> {
        const matchingProfile = await this.findOne(id);

        // If matching profile is not found
        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} is not found!`);
        }

        await this.profilesRepository.remove(matchingProfile);
    }
}
