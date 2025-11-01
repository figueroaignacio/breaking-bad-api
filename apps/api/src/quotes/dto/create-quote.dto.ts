// Decorators
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateQuoteDto {
  @ApiProperty({ example: 'I am the one who knocks' })
  @IsString()
  quote: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  characterId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  episodeId?: number;

  @ApiPropertyOptional({ example: 'Walter confronts Skyler' })
  @IsOptional()
  @IsString()
  context: string;
}
