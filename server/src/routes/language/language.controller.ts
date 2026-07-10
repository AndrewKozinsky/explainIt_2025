import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { languages } from 'utils/languages'
import { LanguageOutModel } from 'models/language/language.out.model'
import { ApiGetLanguages } from './openAPI.decorators'

@ApiTags('Language')
@Controller('language')
export class LanguageController {
	@ApiGetLanguages()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getLanguages(): Promise<LanguageOutModel[]> {
		return Object.values(languages)
	}
}
