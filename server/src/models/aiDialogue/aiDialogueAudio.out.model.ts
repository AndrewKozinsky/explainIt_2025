import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $$ = bdConfig.AiDialogueAudio.dtoProps

/** Готовая озвучка реплики или описания сцены. Текст, голос и ключ хранилища клиенту не отдаются. */
export class AiDialogueAudioOutModel {
	@ApiProperty(getApiPropertyOptions($$.url))
	url: string

	@ApiProperty(getApiPropertyOptions($$.mimeType))
	mimeType: string
}
