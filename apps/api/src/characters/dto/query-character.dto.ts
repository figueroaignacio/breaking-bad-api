// Decorators
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

// Entities
import { CharacterCategory, CharacterStatus } from '../entities/character.entity';

export class QueryCharacterDto {
  @ApiPropertyOptional({ enum: CharacterStatus })
  @IsOptional()
  @IsEnum(CharacterStatus)
  status?: CharacterStatus;

  @ApiPropertyOptional({ enum: CharacterCategory })
  @IsOptional()
  @IsEnum(CharacterCategory)
  category?: CharacterCategory;

  @ApiPropertyOptional({ example: 'Walter' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 10, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 50;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
