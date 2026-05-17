import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import { Language } from 'utils/languages'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

export async function divideTextIntoSentences(params: {
	mainConfigService: MainConfigService
	text: string
	languageCode: Language
}): Promise<string[]> {
	if (!params.languageCode) {
		throw new CustomError(errorMessage.nlp.languageRequired, ErrorStatusCode.BadRequest_400)
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
		throw new CustomError(errorMessage.nlp.cantDivideTextIntoSentences, ErrorStatusCode.InternalServerError_500)
	}
}
