import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class GetSentenceChatThreadInput {
	@Field(() => Int, { description: 'Sentence id' })
	sentenceId: number
}
