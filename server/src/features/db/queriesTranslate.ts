import RouteNames from 'infrastructure/routeNames'

export const queriesTranslate = {
	translateText(dto: { text: string; targetLanguageCode: null | string; sourceLanguageCode?: null | string }) {
		return {
			mutation: `
				mutation TranslateText($input: TranslateTextInput!) {
					${RouteNames.TRANSLATE.TRANSLATE_PHRASE}(input: $input) {
						translatedText
					}
				}
			`,
			variables: {
				input: dto,
			},
		}
	},
}
