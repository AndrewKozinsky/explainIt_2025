import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUniversalAudioPronunciationCommand } from 'features/universalAudioPronunciation/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { CreateUniversalAudioPronunciationInput } from './inputs/createAudioPronunciation.input'
import { audioPronunciationResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalAudioPronunciationResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(OptionalSessionUserGuard)
	@Mutation(() => UniversalAudioPronunciationOutModel, {
		name: RouteNames.AUDIO_PRONUNCIATION.CREATE,
		description: audioPronunciationResolversDesc.createAudioPronunciation,
	})
	async createAudioPronunciation(
		@Args('input') input: CreateUniversalAudioPronunciationInput,
	): Promise<UniversalAudioPronunciationOutModel> {
		return await this.commandBus.execute(new CreateUniversalAudioPronunciationCommand(input.universalPhraseId))
	}
}
