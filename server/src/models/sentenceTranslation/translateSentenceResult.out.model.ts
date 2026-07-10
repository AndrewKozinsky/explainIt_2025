import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.SentenceTranslation.dbFields
const $$ = bdConfig.Sentence.dbFields

export class TranslateSentenceResultOutModel {
    @ApiProperty(getApiPropertyOptions($$.id))
    sentenceId: number

    @ApiProperty(getApiPropertyOptions($.translation))
    translation: string
}
