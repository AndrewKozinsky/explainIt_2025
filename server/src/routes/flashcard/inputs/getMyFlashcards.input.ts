import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional } from 'class-validator'
import { LanguageCode } from 'prisma/generated/client'

@InputType()
export class GetMyFlashcardsInput {
	@Field(() => String, { nullable: true, description: 'Optional language filter' })
	@IsOptional()
	@IsEnum(LanguageCode)
	languageCode?: LanguageCode
}
