import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateTranscriptionInput } from 'routes/transcription/inputs/createTranscription.input'
import { CreateTranscriptionCommand } from 'features/word/CreateTranscription.command'
import RouteNames from 'infrastructure/routeNames'
import { TranscriptionOutModel } from 'models/transcription/transcription.out.model'
import { transcriptionResolversDesc } from './resolverDescriptions'

@Resolver()
export class TranscriptionResolver {
	constructor(private commandBus: CommandBus) {}

	@Mutation(() => TranscriptionOutModel, {
		name: RouteNames.TRANSCRIPTION.CREATE,
		description: transcriptionResolversDesc.createTranscription,
	})
	async createTranscription(@Args('input') input: CreateTranscriptionInput) {
		return await this.commandBus.execute(new CreateTranscriptionCommand(input.wordId))
	}
}
