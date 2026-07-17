import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiTags } from '@nestjs/swagger'
import { UniversalPhraseAudioQueryRepository } from 'repo/universalPhrase/universalPhraseAudio.queryRepository'
import { GetOrCreateUniversalPhraseAudioCommand } from 'features/universalPhraseAudio/GetOrCreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { CreateUniversalPhraseAudioInput } from './inputs/createAudioPronunciation.input'
import { GetUniversalPhraseAudioInput } from './inputs/getAudioPronunciation.input'
import { ApiGetAudio, ApiGetOrCreateAudio } from './openAPI.decorators'

@ApiTags('UniversalPhraseAudio')
@Controller('universal-phrase-audio')
export class UniversalPhraseAudioController {
	constructor(
		private commandBus: CommandBus,
		private audioQueryRepository: UniversalPhraseAudioQueryRepository,
	) {}

	@ApiGetAudio()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.OK)
	@Get()
	async getAudio(@Query() input: GetUniversalPhraseAudioInput): Promise<UniversalAudioPronunciationOutModel | null> {
		return await this.audioQueryRepository.getAudioByUniversalPhraseId(input.universalPhraseId)
	}

	@ApiGetOrCreateAudio()
	@UseGuards(OptionalSessionUserGuard)
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async getOrCreateAudio(
		@Body() input: CreateUniversalPhraseAudioInput,
	): Promise<UniversalAudioPronunciationOutModel> {
		return await this.commandBus.execute(new GetOrCreateUniversalPhraseAudioCommand(input.universalPhraseId))
	}
}
