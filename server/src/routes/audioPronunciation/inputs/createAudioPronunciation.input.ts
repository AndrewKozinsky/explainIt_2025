import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateAudioPronunciationInput {
	@Field(() => Int, { description: 'Word id' })
	@DtoFieldDecorators('wordId', bdConfig.Word.dbFields.id)
	wordId: number
}
