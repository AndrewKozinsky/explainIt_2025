import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AiDialogueScenarioGroupOutModel } from 'models/aiDialogueScenarioGroup/aiDialogueScenarioGroup.out.model'

export function ApiGetAiDialogueScenarioGroups() {
	return applyDecorators(
		ApiOperation({
			summary: 'Get public AI dialogue scenario groups',
			description:
				'Returns all nonempty groups with all their public scenarios and signed cover URLs. Groups and scenarios are ordered by creation date and ID, newest first.',
		}),
		ApiResponse({ status: 200, description: 'OK', type: [AiDialogueScenarioGroupOutModel] }),
	)
}
