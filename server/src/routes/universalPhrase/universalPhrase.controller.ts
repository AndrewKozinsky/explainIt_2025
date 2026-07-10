import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetOrCreateUniversalPhraseCommand } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { GetUniversalPhraseCommand } from 'features/universalPhrase/GetUniversalPhrase.command'
import { UniversalPhraseOutModel } from 'models/universalPhrase/universalPhrase.out.model'
import { CreateUniversalPhraseInput } from './inputs/createUniversalPhrase.input'
import { GetUniversalPhraseInput } from './inputs/getUniversalPhrase.input'
import { ApiGetUniversalPhrase, ApiCreateUniversalPhrase } from './openAPI.decorators'

@ApiTags('UniversalPhrase')
@Controller('universal-phrase')
export class UniversalPhraseController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetUniversalPhrase()
	@HttpCode(HttpStatus.OK)
	@Get()
	async getUniversalPhrase(@Query() input: GetUniversalPhraseInput): Promise<UniversalPhraseOutModel | null> {
		return await this.commandBus.execute(new GetUniversalPhraseCommand(input.text, input.sourceLanguageCode))
	}

	@ApiCreateUniversalPhrase()
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async createUniversalPhrase(@Body() input: CreateUniversalPhraseInput): Promise<UniversalPhraseOutModel> {
		return await this.commandBus.execute(new GetOrCreateUniversalPhraseCommand(input))
	}
}
