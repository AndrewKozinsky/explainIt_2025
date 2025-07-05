import e from 'express'
import { errorMessage } from '../../infrastructure/exceptions/errorMessage'
import { AuthResolver } from './auth.resolver'

export const authResolversDesc: Record<keyof typeof AuthResolver.prototype, string> = {
	register: `Register a user.
	Possible errors:
	**${errorMessage.emailIsNotConfirmed}** — the user is already registered, but doesn't confirm his email.
	**${errorMessage.emailIsAlreadyRegistered}** — the user is already registered and confirmed his email.`,
	login: 'User login',
	confirmEmail: 'Email confirmation',
	getMe: 'Get current user data',
	logout: 'Current user logout',
	resendConfirmationEmail: 'Resend email confirmation letter',
}
