import { Language } from 'utils/languages'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export async function divideTextIntoSentences(params: {
	mainConfigService: MainConfigService
	text: string
	languageCode: Language
}): Promise<string[]> {
	if (!params.languageCode) {
		throw new CustomGraphQLError(errorMessage.nlp.languageRequired, ErrorCode.BadRequest_400)
	}

	try {
		const divideIntoSentencesRes = await fetch(params.mainConfigService.get().nlp.containerUrl + '/sentences', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: params.text, language: params.languageCode }),
		})

		const resJson: { sentences: string[] } = await divideIntoSentencesRes.json()
		return resJson.sentences || []
	} catch (error) {
		throw new CustomGraphQLError(errorMessage.nlp.cantDivideTextIntoSentences, ErrorCode.InternalServerError_500)
	}
}
