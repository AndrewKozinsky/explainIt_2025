import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class EmailAdapterService implements EmailAdapterServiceI {
	private resend: Resend

	constructor(private mainConfig: MainConfigService) {
		this.resend = new Resend(this.mainConfig.get().emailAdapter.resendApiKey)
	}

	async sendEmailConfirmationMessage(userEmail: string, confirmationCode: string) {
		const { name: siteName, domain: siteDomain, domainRootWithProtocol } = this.mainConfig.get().site

		const subject = 'Регистрация на ' + siteName
		const textMessage = 'Регистрация на ' + siteName
		const htmlMessage = `
<h1>Спасибо за регистрацию на ${siteDomain}</h1>
<p>Чтобы закончить регистрацию <a href="${domainRootWithProtocol}/auth/email-confirmation?code=${confirmationCode}">подтвердите почту</a>
</p>
<p>
	<a href="${domainRootWithProtocol}/unsubscribe">отписаться</a>
</p>`

		// Send an email
		await this.sendEmail(userEmail, subject, textMessage, htmlMessage)
	}

	async sendPasswordRecoveryMessage(userEmail: string, recoveryCode: string) {
		const { domainRootWithProtocol } = this.mainConfig.get().site

		const subject = 'Password recovery at our web-site'
		const textMessage = 'Password recovery at our web-site'
		const htmlMessage = `
<h1>Password recovery</h1>
<p>To finish password recovery please follow the link below:
  <a href='${domainRootWithProtocol}/auth/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
</p>`

		// Send an email
		await this.sendEmail(userEmail, subject, textMessage, htmlMessage)
	}

	/**
	 * Отправляет письмо через Resend.
	 * Ошибка отправки только логируется: часть вызывающих команд не ждёт результата,
	 * и выброшенное исключение стало бы необработанным отказом промиса.
	 */
	async sendEmail(toEmail: string, subject: string, textMessage: string, htmlMessage: string): Promise<null> {
		const { mode, emailAdapter } = this.mainConfig.get()

		// Don't operate in testing mode
		if (mode === 'localtest') {
			console.log('Letter is not sent in testing mode')
			return null
		}

		const { error } = await this.resend.emails.send({
			from: `${emailAdapter.fromName} <${emailAdapter.fromEmail}>`,
			to: toEmail,
			subject,
			text: textMessage,
			html: htmlMessage,
		})

		if (error) {
			console.error(`Failed to send email via Resend: ${error.name} ${error.message}`)
		}

		return null
	}
}

export interface EmailAdapterServiceI {
	sendEmail(toEmail: string, subject: string, textMessage: string, htmlMessage: string): Promise<null>
}

@Injectable()
export class EmailAdapterServiceMock implements EmailAdapterServiceI {
	constructor() {}

	async sendEmail(toEmail: string, subject: string, textMessage: string, htmlMessage: string) {
		return null
	}
}
