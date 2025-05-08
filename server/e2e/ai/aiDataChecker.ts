import RouteNames from '../../src/infrastructure/routeNames'

export const aiDataChecker = {
	checkTranslation: {
		checkErrorRes(checkTranslationResp: any) {
			expect(checkTranslationResp.data[RouteNames.AI.CHECK_TRANSLATION]).toEqual({
				error: 'Не удалось сделать запрос. Попробуйте ещё раз.',
			})
		},
		checkSuccessRes(checkTranslationResp: any) {
			expect(checkTranslationResp.data[RouteNames.AI.CHECK_TRANSLATION]).toEqual({
				correct: expect.any(Boolean),
				analysis: expect.any(String),
			})
		},
	},
	getTranscription: {
		checkErrorRes(checkTranslationResp: any) {
			expect(checkTranslationResp.data[RouteNames.AI.CHECK_TRANSLATION]).toEqual({
				error: 'Не удалось сделать запрос.',
			})
		},
		checkSuccessRes(checkTranslationResp: any) {
			expect(checkTranslationResp.data[RouteNames.AI.CHECK_TRANSLATION]).toEqual({
				transcription: expect.any(Boolean),
			})
		},
	},
}
