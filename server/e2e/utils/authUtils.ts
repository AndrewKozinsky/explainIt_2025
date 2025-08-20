import { INestApplication } from '@nestjs/common'
import { errorMessage } from '../../src/infrastructure/exceptions/errorMessage'
import { makeGraphQLReq } from '../makeGQReq'
import { checkErrorResponse } from './checkErrorResp'

export const authUtils = {
	// should return 401 if there aren't cookies
	async tokenNotExist(props: {
		app: INestApplication
		queryOrMutationStr: string
		queryVariables?: Record<string, any>
	}) {
		const [queryResp] = await makeGraphQLReq(props.app, props.queryOrMutationStr, props.queryVariables)

		checkErrorResponse(queryResp, {
			code: 'Unauthorized',
			statusCode: 401,
			message: errorMessage.userUnauthorized,
		})
	},
}
