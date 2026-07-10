import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { OAuthProviderType } from '../inputs/loginWithOAuth.input'

export class LoginWithOAuthDto {
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
