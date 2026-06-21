import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUniversalPhraseTranscriptionInput } from 'routes/universalPhraseTranscription/inputs/createUniversalPhraseTranscription.input'
import { GetOrCreateUniversalPhraseTranscriptionCommand } from 'features/universalPhraseTranscription/CreateUniversalPhraseTranscription.command'
import RouteNames from 'infrastructure/routeNames'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { transcriptionResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalPhraseTranscriptionResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranscriptionOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE_TRANSCRIPTION.GET_OR_CREATE,
		description: transcriptionResolversDesc.getOrCreateTranscription,
	})
	async getOrCreateTranscription(@Args('input') input: CreateUniversalPhraseTranscriptionInput) {
		return await this.commandBus.execute(
			new GetOrCreateUniversalPhraseTranscriptionCommand(input.universalPhraseId),
		)
	}
}
