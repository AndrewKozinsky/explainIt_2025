import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiCookieAuth } from '@nestjs/swagger'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { UserOutModel } from 'models/user/user.out.model'
import { ConfirmEmailDto } from './dto/confirm-email.dto'
import { LoginDto } from './dto/login.dto'
import { LoginWithOAuthDto } from './dto/loginWithOAuth.dto'
import { RegisterDto } from './dto/register.dto'
import { ResendConfirmationEmailDto } from './dto/resend-confirmation-email.dto'

export function ApiRegister() {
	return applyDecorators(
		ApiOperation({
			summary: 'Register',
			description: `Register a user with email and password.
Possible errors:
**${errorMessage.email.isNotConfirmed.errorMessageCode}** — the user is already registered, but didn't confirm their email.
**${errorMessage.email.isAlreadyRegistered.errorMessageCode}** — the user is already registered and confirmed their email.`,
		}),
		ApiBody({ type: RegisterDto }),
		ApiResponse({ status: 201, description: 'Created', type: UserOutModel }),
		ApiResponse({
			status: 400,
			description: [
				errorMessage.email.isAlreadyRegistered.errorMessageCode,
				errorMessage.email.isNotConfirmed.errorMessageCode,
			].join(' | '),
		}),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiConfirmEmail() {
	return applyDecorators(
		ApiOperation({
			summary: 'Confirm email',
			description: 'Confirms user email using the confirmation code sent after registration.',
		}),
		ApiBody({ type: ConfirmEmailDto }),
		ApiResponse({ status: 200, description: 'OK' }),
		ApiResponse({
			status: 400,
			description: `Validation error | ${errorMessage.email.confirmationCodeNotFound.errorMessageCode} | ${errorMessage.email.confirmationCodeIsExpired.errorMessageCode}`,
		}),
		ApiResponse({ status: 500, description: errorMessage.unknownDbError.errorMessageCode }),
	)
}

export function ApiResendConfirmationEmail() {
	return applyDecorators(
		ApiOperation({
			summary: 'Resend confirmation email',
			description: 'Resends the email confirmation message to the specified email address.',
		}),
		ApiBody({ type: ResendConfirmationEmailDto }),
		ApiResponse({ status: 200, description: 'OK' }),
		ApiResponse({
			status: 400,
			description: `Validation error | ${errorMessage.email.notFound.errorMessageCode} | ${errorMessage.email.isAlreadyConfirmed.errorMessageCode}`,
		}),
	)
}

export function ApiLogin() {
	return applyDecorators(
		ApiOperation({
			summary: 'User login',
			description: 'Authenticates a user with email and password. On success, sets a session cookie.',
		}),
		ApiBody({ type: LoginDto }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
		ApiResponse({ status: 400, description: 'Validation error' }),
		ApiResponse({ status: 403, description: errorMessage.email.isNotConfirmed.errorMessageCode }),
		ApiResponse({ status: 404, description: errorMessage.user.notFound.errorMessageCode }),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.noSessionObject.errorMessageCode,
				errorMessage.cannotSaveSession.errorMessageCode,
			].join(' | '),
		}),
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
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
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
		ApiResponse({ status: 401, description: errorMessage.user.unauthorized.errorMessageCode }),
		ApiResponse({ status: 500, description: errorMessage.cannotFinishSession.errorMessageCode }),
	)
}

export function ApiLoginWithOAuth() {
	return applyDecorators(
		ApiOperation({
			summary: 'OAuth login',
			description:
				'Authenticates a user via OAuth provider (github, google, yandex). On success, sets a session cookie.',
		}),
		ApiBody({ type: LoginWithOAuthDto }),
		ApiResponse({ status: 200, description: 'OK', type: UserOutModel }),
		ApiResponse({
			status: 400,
			description: `Validation error | ${errorMessage.cannotGetAccessTokenForOAuthProvider.errorMessageCode}`,
		}),
		ApiResponse({
			status: 500,
			description: [
				errorMessage.cannotGetUserDataFromOAuthProvider.errorMessageCode,
				errorMessage.unknownDbError.errorMessageCode,
				errorMessage.noSessionObject.errorMessageCode,
				errorMessage.cannotSaveSession.errorMessageCode,
			].join(' | '),
		}),
	)
}
