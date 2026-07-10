import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { GetOrCreateUniversalPhraseTranscriptionCommand } from 'features/universalPhraseTranscription/CreateUniversalPhraseTranscription.command'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { CreateUniversalPhraseTranscriptionInput } from './inputs/createUniversalPhraseTranscription.input'
import { ApiGetOrCreateTranscription } from './openAPI.decorators'

@ApiTags('UniversalPhraseTranscription')
@Controller('universal-phrase-transcription')
export class UniversalPhraseTranscriptionController {
	constructor(private commandBus: CommandBus) {}

	@ApiGetOrCreateTranscription()
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async getOrCreateTranscription(
		@Body() input: CreateUniversalPhraseTranscriptionInput,
	): Promise<TranscriptionOutModel> {
		return await this.commandBus.execute(
			new GetOrCreateUniversalPhraseTranscriptionCommand(input.universalPhraseId),
		)
	}
}
