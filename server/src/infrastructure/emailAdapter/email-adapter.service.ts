import { Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import { MainConfigService } from '../mainConfig/mainConfig.service'

/** Содержимое письма без получателя: то, что собирают шаблоны из infrastructure/emails. */
export type EmailContent = {
	subject: string
	text: string
	html: string
}

export type EmailMessage = EmailContent & {
	to: string
}

export interface EmailAdapterServiceI {
	send(message: EmailMessage): Promise<void>
}

/** Отправляет готовые письма через Resend. О содержимом писем ничего не знает. */
@Injectable()
export class EmailAdapterService implements EmailAdapterServiceI {
	private resend: Resend

	constructor(private mainConfig: MainConfigService) {
		this.resend = new Resend(this.mainConfig.get().emailAdapter.resendApiKey)
	}

	/**
	 * Отправляет письмо от имени сайта.
	 * Ошибка отправки только логируется: часть вызывающих команд не ждёт результата,
	 * и выброшенное исключение стало бы необработанным отказом промиса.
	 */
	async send(message: EmailMessage) {
		const { fromName, fromEmail } = this.mainConfig.get().emailAdapter

		const { error } = await this.resend.emails.send({
			from: `${fromName} <${fromEmail}>`,
			to: message.to,
			subject: message.subject,
			text: message.text,
			html: message.html,
		})

		if (error) {
			console.error(`Failed to send email via Resend: ${error.name} ${error.message}`)
		}
	}
}

/** Заглушка для режима localtest: письма не отправляются. */
@Injectable()
export class EmailAdapterServiceMock implements EmailAdapterServiceI {
	async send(_message: EmailMessage) {}
}
