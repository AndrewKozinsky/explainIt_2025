import { Controller, Query, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { TranslateService } from 'routes/translate/translate.service'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import RouteNames from 'infrastructure/routeNames'
import { TranslateSentenceStreamQuery } from './inputs/translateSentenceStream.query'

@Controller()
export class TranslateController {
	constructor(private translateService: TranslateService) {}

	@UseGuards(OptionalSessionUserGuard)
	@Get(RouteNames.TRANSLATE.TRANSLATE_SENTENCE_STREAM)
	async translateSentenceStream(
		@Query() query: TranslateSentenceStreamQuery,
		@Req() request: Request,
		@Res() response: Response,
	) {
		const userId = request.user?.id ?? null
		const currentSubscription = request.user?.currentSubscription ?? null

		await this.translateService.translateSentenceStream({
			userId,
			currentSubscription,
			query,
			request,
			response,
		})
	}
}
