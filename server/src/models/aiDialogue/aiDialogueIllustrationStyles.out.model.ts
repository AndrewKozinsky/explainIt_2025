import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogue.dtoProps

export class AiDialogueIllustrationStyleOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.illustration_style_id))
	id: string

	@ApiProperty(getApiPropertyOptions($.illustrationStyleTitleKey))
	titleKey: string

	@ApiProperty(getApiPropertyOptions($.illustrationStylePreviewUrl))
	previewUrl: string
}

export class AiDialogueIllustrationStylesOutModel {
	@ApiProperty(getApiPropertyOptions($.defaultIllustrationStyleId))
	defaultStyleId: string

	@ApiProperty({
		type: [AiDialogueIllustrationStyleOutModel],
		description: 'Available illustration styles in display order',
	})
	styles: AiDialogueIllustrationStyleOutModel[]

	@ApiProperty(getApiPropertyOptions($.visualUrlsExpireAt))
	urlsExpireAt: string
}
