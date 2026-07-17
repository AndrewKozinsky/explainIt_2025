import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'
import { ConfirmEmailInput } from 'routes/auth/inputs/confirmEmail.input'
import { LoginInput } from 'routes/auth/inputs/login.input'
import { LoginWithOAuthInput } from 'routes/auth/inputs/loginWithOAuth.input'
import { RegisterUserInput } from 'routes/auth/inputs/registerUser.input'
import { ResendConfirmationEmailInput } from 'routes/auth/inputs/resendConfirmationEmail.input'
import { UserOutModel } from 'models/user/user.out.model'

export function ApiRegister() {
	return applyDecorators(
		ApiOperation({
			summary: 'Register',
			description: 'Register a user with email and password.',
		}),
		ApiBody({ type: RegisterUserInput }),
		ApiResponse({ status: 201, description: 'Created', type: UserOutModel }),
	)
}

export function ApiConfirmEmail() {
	return applyDecorators(
		ApiOperation({
			summary: 'Confirm email',
			description: 'Confirms user email using the confirmation code sent after registration.',
		}),
		ApiBody({ type: ConfirmEmailInput }),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}

export function ApiResendConfirmationEmail() {
	return applyDecorators(
		ApiOperation({
			summary: 'Resend confirmation email',
			description: 'Resends the email confirmation message to the specified email address.',
		}),
		ApiBody({ type: ResendConfirmationEmailInput }),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}

export function ApiLogin() {
	return applyDecorators(
		ApiOperation({
			summary: 'User login',
			description: 'Authenticates a user with email and password. On success, sets a session cookie.',
		}),
		ApiBody({ type: LoginInput }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}

export function ApiGetMe() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get current user',
			description: 'Returns the currently authenticated user data.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}

export function ApiLogout() {
	return applyDecorators(
		ApiOperation({
			summary: 'Logout',
			description: 'Destroys the current session and clears the session cookie.',
		}),
		ApiCookieAuth(),
		ApiResponse({ status: 200, description: 'OK' }),
	)
}

export function ApiLoginWithOAuth() {
	return applyDecorators(
		ApiOperation({
			summary: 'OAuth login',
			description:
				'Authenticates a user via OAuth provider (github, google, yandex). On success, sets a session cookie.',
		}),
		ApiBody({ type: LoginWithOAuthInput }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
	)
}
