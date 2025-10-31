// Decorators
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

// Entities
import { CharacterCategory, CharacterStatus } from '../entities/character.entity';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Walter White' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Heisenberg' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ example: '09-07-1958' })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiPropertyOptional({ example: ['High School Chemistry Teacher', 'Meth King Pin'] })
  @IsOptional()
  @IsArray()
  occupation?: string[];

  @ApiPropertyOptional({ example: 'https://example.com/walter.jpg' })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({ example: 'deceased', enum: CharacterStatus })
  @IsEnum(CharacterStatus)
  status: CharacterStatus;

  @ApiPropertyOptional({ example: 'Bryan Cranston' })
  @IsOptional()
  @IsString()
  portrayed?: string;

  @ApiProperty({ example: 'breaking_bad', enum: CharacterCategory })
  @IsEnum(CharacterCategory)
  category: CharacterCategory;

  @ApiPropertyOptional({ example: 'A high school chemistry teacher...' })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;
}
