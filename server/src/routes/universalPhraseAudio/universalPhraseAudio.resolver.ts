import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UniversalPhraseAudioQueryRepository } from 'repo/universalPhraseAudio.queryRepository'
import { GetOrCreateUniversalPhraseAudioCommand } from 'features/universalPhraseAudio/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { CreateUniversalPhraseAudioInput } from './inputs/createAudioPronunciation.input'
import { GetUniversalPhraseAudioInput } from './inputs/getAudioPronunciation.input'
import { universalPhraseAudioResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalPhraseAudioResolver {
	constructor(
		private commandBus: CommandBus,
		private audioQueryRepository: UniversalPhraseAudioQueryRepository,
	) {}

	@UseGuards(OptionalSessionUserGuard)
	@Query(() => UniversalAudioPronunciationOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE_AUDIO.GET,
		description: universalPhraseAudioResolversDesc.getAudio,
		nullable: true,
	})
	async getAudio(
		@Args('input') input: GetUniversalPhraseAudioInput,
	): Promise<UniversalAudioPronunciationOutModel | null> {
		return await this.audioQueryRepository.getAudioByUniversalPhraseId(input.universalPhraseId)
	}

	@UseGuards(OptionalSessionUserGuard)
	@Mutation(() => UniversalAudioPronunciationOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE_AUDIO.GET_OR_CREATE,
		description: universalPhraseAudioResolversDesc.getOrCreateAudio,
	})
	async getOrCreateAudio(
		@Args('input') input: CreateUniversalPhraseAudioInput,
	): Promise<UniversalAudioPronunciationOutModel> {
		return await this.commandBus.execute(new GetOrCreateUniversalPhraseAudioCommand(input.universalPhraseId))
	}
}
