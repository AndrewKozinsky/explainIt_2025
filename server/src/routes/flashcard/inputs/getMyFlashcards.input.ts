import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/client'

export class GetMyFlashcardsInput {
	@DtoFieldDecorators('languageCode', bdConfig.Flashcard.dbFields.language_code, { required: false })
	languageCode?: LanguageCode
}
