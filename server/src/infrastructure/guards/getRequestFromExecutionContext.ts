import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

export function getRequestFromExecutionContext(context: ExecutionContext): Request {
	if (context.getType<'http' | 'graphql'>() === 'http') {
		return context.switchToHttp().getRequest<Request>()
	}

	const gqlContext = GqlExecutionContext.create(context)
	
	return gqlContext.getContext().req as Request
}
