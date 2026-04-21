import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateSentenceChatThreadInput {
	@Field(() => Int, { description: 'Sentence id' })
	sentenceId: number
}
