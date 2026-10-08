import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { match } from 'assert';

@Injectable()
export class ProfilesService {
    // Array of Objects profile
    private profiles = [
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

    // Get all profiles
    findAll() {
        return this.profiles;
    }

    // Get particular profile
    findOne(id: string) {
        const matchingProfile = this.profiles.find((profile) => profile.id === id);

        // If matching profile is not found
        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} not found`);
        }

        return matchingProfile;
    }

    // Create a profile
    create(createProfileDto: CreateProfileDto) {
        const createdProfile = {
            id: randomUUID(),
            ...createProfileDto,
        }

        this.profiles.push(createdProfile);
        return createdProfile;
    }

    // Update a profile
    update(id: string, updateProfileDto: UpdateProfileDto) {
        const matchingProfile = this.profiles.find(
            (existingProfile) => existingProfile.id === id
        );

        // If matching profile is not found
        if (!matchingProfile) {
            throw new Error(`Profile with ID ${id} not found`);
        }

        matchingProfile.name = updateProfileDto.name;
        matchingProfile.description = updateProfileDto.description;

        return matchingProfile;
    }

    // Delete a profile
    remove(id: string): void {
        const matchingProfileIndex = this.profiles.findIndex(
            (existingProfile) => existingProfile.id === id
        );

        // If matching profile index is not found
        if (matchingProfileIndex === -1) {
            throw new Error(`Profile with ID ${id} not found`);
        }

        this.profiles.splice(matchingProfileIndex, 1);
    }
}
