import { InputType } from '@nestjs/graphql'
import { OAuthProviderType } from '../../routes/auth/inputs/loginWithOAuth.input'

export class ConfirmEmailInputModel {
	code: string
}

export class LoginInputModel {
	email: string
	password: string
}

export class LoginWithOAuthInputModel {
	providerType: OAuthProviderType
	code: string
}

@InputType()
export class RegisterUserInputModel {
	email: string
	password?: string
	isUserConfirmed?: boolean
}
