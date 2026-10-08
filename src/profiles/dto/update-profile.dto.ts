import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MaxLength(200)
    description: string;
}