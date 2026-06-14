import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUniversalPhraseTranscriptionInput } from 'routes/universalPhraseTranscription/inputs/createUniversalPhraseTranscription.input'
import { CreateUniversalTranscriptionCommand } from 'features/universalPhraseTranscription/CreateUniversalTranscription.command'
import RouteNames from 'infrastructure/routeNames'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { transcriptionResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalPhraseTranscriptionResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranscriptionOutModel, {
		name: RouteNames.UNIVERSAL_PHRASE_TRANSCRIPTION.CREATE,
		description: transcriptionResolversDesc.createTranscription,
	})
	async createTranscription(@Args('input') input: CreateUniversalPhraseTranscriptionInput) {
		return await this.commandBus.execute(new CreateUniversalTranscriptionCommand(input.universalPhraseId))
	}
}
