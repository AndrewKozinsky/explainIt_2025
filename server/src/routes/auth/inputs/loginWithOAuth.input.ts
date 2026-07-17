import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export enum OAuthProviderType {
	GITHUB = 'github',
	GOOGLE = 'google',
	YANDEX = 'yandex',
}

export class LoginWithOAuthInput {
	@ApiProperty({
		description: 'OAuth provider type',
		enum: OAuthProviderType,
		example: OAuthProviderType.GOOGLE,
	})
	@IsEnum(OAuthProviderType, { message: 'Provider must be one of: github, google, yandex' })
	providerType: OAuthProviderType

	@DtoFieldDecorators('code', bdConfig.User.dtoProps.codeToGetUserDataFromOAuthProvider)
	code: string
}
