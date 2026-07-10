import { ApiProperty } from '@nestjs/swagger'

export class LanguageOutModel {
	@ApiProperty({ description: 'Language name in its native form', example: 'English' })
	name: string

	@ApiProperty({ description: 'Language name in English', example: 'english' })
	nameEng: string

	@ApiProperty({ description: 'Language code (ISO)', example: 'en' })
	code: string
}
