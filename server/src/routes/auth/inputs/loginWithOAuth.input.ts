import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

export enum OAuthProviderType {
	GITHUB = 'github',
	GOOGLE = 'google',
	YANDEX = 'yandex',
}

@InputType()
export class LoginWithOAuthInput {
	@Field({ description: 'Provider type: github, google, yandex' })
	@IsEnum(OAuthProviderType, { message: 'Provider must be one of: github, google, yandex' })
	providerType: OAuthProviderType

	@Field({ description: 'Code to get user data from OAuth provider' })
	@DtoFieldDecorators('code', bdConfig.User.dtoProps.codeToGetUserDataFromOAuthProvider)
	code: string
}
