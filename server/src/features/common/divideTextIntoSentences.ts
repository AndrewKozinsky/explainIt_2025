import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export async function divideTextIntoSentences(params: {
	mainConfigService: MainConfigService
	text: string
}): Promise<string[]> {
	try {
		const divideIntoSentencesRes = await fetch(params.mainConfigService.get().nlp.containerUrl + '/sentences', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: params.text }),
		})

		const resJson: { sentences: string[] } = await divideIntoSentencesRes.json()
		return resJson.sentences || []
	} catch (error) {
		throw new CustomGraphQLError(errorMessage.nlp.cantDivideTextIntoSentences, ErrorCode.InternalServerError_500)
	}
}
