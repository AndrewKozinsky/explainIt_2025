import { Controller, Query, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { TranslateService } from 'routes/translate/translate.service'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import RouteNames from 'infrastructure/routeNames'
import { TranslateSentenceStreamQuery } from './inputs/translateSentenceStream.query'

@Controller()
export class TranslateController {
	constructor(private translateService: TranslateService) {}

	@UseGuards(CheckSessionCookieGuard)
	@Get(RouteNames.TRANSLATE.TRANSLATE_SENTENCE_STREAM)
	async translateSentenceStream(
		@Query() query: TranslateSentenceStreamQuery,
		@Req() request: Request,
		@Res() response: Response,
	) {
		await this.translateService.translateSentenceStream({
			query,
			request,
			response,
		})
	}
}
