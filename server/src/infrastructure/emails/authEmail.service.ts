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

		const siteUrl = this.buildSiteUrl(locale)
		const confirmationUrl = `${siteUrl}/auth/email-confirmation?${new URLSearchParams({ code: confirmationCode })}`
		const content = buildEmailConfirmationEmail({ locale, siteName, siteUrl, confirmationUrl })

		await this.emailAdapter.send({ to: email, ...content })
	}

	async sendPasswordRecovery(input: { email: string; recoveryCode: string; locale: Language }) {
		const { email, recoveryCode, locale } = input
		const { name: siteName } = this.mainConfig.get().site

		const siteUrl = this.buildSiteUrl(locale)
		const recoveryUrl = `${siteUrl}/auth/password-recovery?${new URLSearchParams({ recoveryCode })}`
		const content = buildPasswordRecoveryEmail({ locale, siteName, siteUrl, recoveryUrl })

		await this.emailAdapter.send({ to: email, ...content })
	}

	/** Главная страница сайта на языке письма: клиент открывает страницы только по адресам с префиксом вида /ru. */
	private buildSiteUrl(locale: Language) {
		const { domainRootWithProtocol } = this.mainConfig.get().site

		return `${domainRootWithProtocol}/${locale}`
	}
}
