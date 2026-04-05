// import { CommandBus } from '@nestjs/cqrs'
// import { Args, Mutation, Resolver } from '@nestjs/graphql'
// import { CreateAudioPronunciationInput } from 'routes/audioPronunciation/inputs/createAudioPronunciation.input'
// import { CreateAudioPronunciationCommand } from 'features/audioPronunciation/CreateAudioPronunciation.command'
// import RouteNames from 'infrastructure/routeNames'
// import { AudioPronunciationOutModel } from 'models/audioPronunciation/audioPronunciation.out.model'
// import { audioPronunciationResolversDesc } from './resolverDescriptions'

/*@Resolver()
export class AudioPronunciationResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => AudioPronunciationOutModel, {
		name: RouteNames.AUDIO_PRONUNCIATION.CREATE,
		description: audioPronunciationResolversDesc.createAudioPronunciation,
	})
	async createAudioPronunciation(@Args('input') input: CreateAudioPronunciationInput) {
		return await this.commandBus.execute(new CreateAudioPronunciationCommand(input.wordId))
	}
}*/
