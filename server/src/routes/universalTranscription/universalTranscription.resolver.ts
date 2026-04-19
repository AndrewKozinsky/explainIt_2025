import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUniversalTranscriptionInput } from 'routes/universalTranscription/inputs/createUniversalTranscription.input'
import { CreateUniversalTranscriptionCommand } from 'features/universalTranscription/CreateUniversalTranscription.command'
import RouteNames from 'infrastructure/routeNames'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { transcriptionResolversDesc } from './resolverDescriptions'

@Resolver()
export class UniversalTranscriptionResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranscriptionOutModel, {
		name: RouteNames.UNIVERSAL_TRANSCRIPTION.CREATE,
		description: transcriptionResolversDesc.createTranscription,
	})
	async createTranscription(@Args('input') input: CreateUniversalTranscriptionInput) {
		return await this.commandBus.execute(new CreateUniversalTranscriptionCommand(input.universalPhraseId))
	}
}
