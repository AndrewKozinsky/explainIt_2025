import { Controller, HttpCode, HttpStatus, Body, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { WebhookService } from './webhook.service'

@Controller()
export class WebhookController {
	constructor(private webhookService: WebhookService) {}

	@HttpCode(HttpStatus.OK)
	@Post('webhook/yookassa')
	async yooKassa(@Body() body: any, @Req() req: Request) {
		await this.webhookService.yookassa(req, body)
	}
}
