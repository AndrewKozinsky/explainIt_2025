import { UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUniversalAudioPronunciationCommand } from 'features/universalPhraseAudio/CreateAudioPronunciation.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { UniversalAudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
import { CreateUniversalPhraseAudioInput } from './inputs/createAudioPronunciation.input'
import { audioPronunciationResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalAudioPronunciationResolver {
	constructor(private commandBus: CommandBus) {}

	@UseGuards(OptionalSessionUserGuard)
	@Mutation(() => UniversalAudioPronunciationOutModel, {
		name: RouteNames.AUDIO_PRONUNCIATION.CREATE,
		description: audioPronunciationResolversDesc.createAudio,
	})
	async createAudio(
		@Args('input') input: CreateUniversalPhraseAudioInput,
	): Promise<UniversalAudioPronunciationOutModel> {
		return await this.commandBus.execute(new CreateUniversalAudioPronunciationCommand(input.universalPhraseId))
	}
}
