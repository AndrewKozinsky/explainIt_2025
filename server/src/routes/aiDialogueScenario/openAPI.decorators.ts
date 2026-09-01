import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'

export function ApiGetAiDialogueScenarios() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public AI dialogue scenarios',
			description: 'Returns the list of public AI dialogue scenarios.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [AiDialogueScenarioOutModel] }),
	)
}
