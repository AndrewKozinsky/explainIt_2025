import { Field, InputType } from '@nestjs/graphql'
import { LanguageCode } from 'prisma/generated/client'

@InputType()
export class GetMyFlashcardsInput {
	@Field(() => String, { nullable: true, description: 'Optional language filter' })
	languageCode?: LanguageCode
}
