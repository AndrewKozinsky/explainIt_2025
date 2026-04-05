import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateTranscriptionInput {
	@Field(() => Int, { description: 'Word id' })
	@DtoFieldDecorators('wordId', bdConfig.Transcription.dbFields.word_id, { type: 'number', required: true, min: 1 })
	wordId: number
}
