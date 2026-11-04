import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { Language } from 'utils/languages'
import { parseRequestLocale } from './parseRequestLocale'

/** Язык интерфейса текущего запроса для выбора переводов контента (названия и описания групп и сценариев). */
export const RequestLocale = createParamDecorator((_data: unknown, context: ExecutionContext): Language => {
	const request = context.switchToHttp().getRequest<Request>()

	return parseRequestLocale(request.headers['accept-language'])
})
