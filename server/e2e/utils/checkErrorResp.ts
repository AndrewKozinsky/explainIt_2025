export function checkErrorResponse(
	errResponse: unknown,
	extensionsObj: {
		code?: string // 'BAD_REQUEST'
		statusCode: number // 400
		message: string
		validationErrors?: any
	},
) {
	expect(errResponse).toEqual({
		data: null,
		errors: expect.arrayContaining([
			expect.objectContaining({
				message: extensionsObj.message,
				locations: expect.arrayContaining([
					expect.objectContaining({
						line: expect.any(Number),
						column: expect.any(Number),
					}),
				]),
				path: expect.arrayContaining([expect.any(String)]),
				extensions: expect.objectContaining(checkExtensions(extensionsObj)),
			}),
		]),
	})
}

function checkExtensions(extensionsObj: {
	code?: string // 'BAD_REQUEST'
	statusCode: number // 400
	message: string
	validationErrors?: any
}) {
	const expectedExtensions: any = {
		statusCode: extensionsObj.statusCode,
		code: expect.any(String),
		message: extensionsObj.message,
	}
	if (extensionsObj.code) {
		expectedExtensions.code = extensionsObj.code
	}
	if (extensionsObj.validationErrors) {
		expectedExtensions.validationErrors = extensionsObj.validationErrors
	}

	return expectedExtensions
}
