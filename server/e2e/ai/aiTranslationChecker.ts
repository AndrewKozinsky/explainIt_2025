import RouteNames from '../../src/infrastructure/routeNames'

export const aiTranslationChecker = {
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
		checkErrorRes(getTranscriptionResp: any) {
			expect(getTranscriptionResp.data[RouteNames.AI.GET_TRANSCRIPTION]).toEqual({
				error: 'Не удалось сделать запрос. Попробуйте ещё раз.',
			})
		},
		checkSuccessRes(getTranscriptionResp: any) {
			expect(getTranscriptionResp.data[RouteNames.AI.GET_TRANSCRIPTION]).toEqual({
				transcription: expect.any(String),
			})
		},
	},
}
