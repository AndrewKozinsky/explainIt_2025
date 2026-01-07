import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ResolvedTextStructure } from './resolvedTextStructure'

export async function plainTextToResolved(
	mainConfigService: MainConfigService,
	plainText?: null | string,
): Promise<ResolvedTextStructure.Structure> {
	if (!plainText) {
		return {
			type: 'plainText',
			sentences: [],
		}
	}

	const res = await fetch(mainConfigService.get().nlp.containerUrl + '/sentences', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: plainText }),
	})

	const data: { sentences: string[] } = await res.json()

	return {
		type: 'plainText',
		sentences: data.sentences.map((sentence) => ({
			s: sentence,
		})),
	}
}
