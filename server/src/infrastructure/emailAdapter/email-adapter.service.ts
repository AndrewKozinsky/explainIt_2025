import { Injectable } from '@nestjs/common'
import { MainConfigService } from '../mainConfig/mainConfig.service'
const sendPulse = require('sendpulse-api')

@Injectable()
export class EmailAdapterService implements EmailAdapterServiceI {
	constructor(private mainConfig: MainConfigService) {}

	async sendEmailConfirmationMessage(userEmail: string, confirmationCode: string) {
		const siteName = this.mainConfig.get().site.name
		const { domainRootWithProtocol } = this.mainConfig.get().site

		const subject = 'Регистрация на ' + siteName
		const textMessage = 'Регистрация на ' + siteName
		const htmlMessage = `
<h1>Thanks for your registration</h1>
<p>To finish registration please confirm your email by following the link:
	<a href="${domainRootWithProtocol}/auth/email-confirmation?code=${confirmationCode}">confirm email</a>
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

	async sendEmail(toEmail: string, subject: string, textMessage: string, htmlMessage: string): Promise<null> {
		return new Promise((resolve, reject) => {
			// Don't operate in testing mode
			if (this.mainConfig.get().mode === 'localtest') {
				console.log('Letter is not sent in testing mode')
				resolve(null)
				return
			}

			/* https://login.sendpulse.com/settings/#api */
			const API_USER_ID = this.mainConfig.get().emailAdapter.userId
			const API_SECRET = this.mainConfig.get().emailAdapter.secret
			const FROM_NAME = this.mainConfig.get().emailAdapter.fromName
			const FROM_EMAIL = this.mainConfig.get().emailAdapter.fromEmail
			const TOKEN_STORAGE = '/tmp/'

			sendPulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function () {
				const emailOptions = {
					html: htmlMessage,
					text: textMessage,
					subject: subject,
					from: {
						name: FROM_NAME,
						email: FROM_EMAIL,
					},
					to: [
						{
							email: toEmail,
						},
					],
				}

				try {
					sendPulse.smtpSendMail(() => {
						resolve(null)
					}, emailOptions)
				} catch (err) {
					console.log(err)
					reject()
				}
			})
		})
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
