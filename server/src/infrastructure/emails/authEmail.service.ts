import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { EmailAdapterService } from 'infrastructure/emailAdapter/email-adapter.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { buildEmailConfirmationEmail } from './emailConfirmationEmail'
import { buildPasswordRecoveryEmail } from './passwordRecoveryEmail'

/** Письма авторизации: собирает ссылку и текст на языке пользователя и передаёт письмо адаптеру. */
@Injectable()
export class AuthEmailService {
	constructor(
		private emailAdapter: EmailAdapterService,
		private mainConfig: MainConfigService,
	) {}

	async sendEmailConfirmation(input: { email: string; confirmationCode: string; locale: Language }) {
		const { email, confirmationCode, locale } = input
		const { name: siteName } = this.mainConfig.get().site

		const confirmationUrl = this.buildSiteUrl(locale, '/auth/email-confirmation', { code: confirmationCode })
		const content = buildEmailConfirmationEmail({ locale, siteName, confirmationUrl })

		await this.emailAdapter.send({ to: email, ...content })
	}

	async sendPasswordRecovery(input: { email: string; recoveryCode: string; locale: Language }) {
		const { email, recoveryCode, locale } = input
		const { name: siteName } = this.mainConfig.get().site

		const recoveryUrl = this.buildSiteUrl(locale, '/auth/password-recovery', { recoveryCode })
		const content = buildPasswordRecoveryEmail({ locale, siteName, recoveryUrl })

		await this.emailAdapter.send({ to: email, ...content })
	}

	/** Ссылка на страницу сайта с префиксом языка: клиент открывает страницы только по адресам вида /ru/... */
	private buildSiteUrl(locale: Language, pagePath: string, queryParams: Record<string, string>) {
		const { domainRootWithProtocol } = this.mainConfig.get().site
		const query = new URLSearchParams(queryParams).toString()

		return `${domainRootWithProtocol}/${locale}${pagePath}?${query}`
	}
}
