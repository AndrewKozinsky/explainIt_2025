export type ImageGenerationErrorCode =
	| 'unsupported_model'
	| 'invalid_input'
	| 'invalid_operation'
	| 'configuration'
	| 'recovery_unsupported'
	| 'aborted'
	| 'request_failed'
	| 'invalid_response'
	| 'moderated'
	| 'operation_failed'

/** Safe error without SDK config, secrets, reference bytes or signed URLs.
 * unknown after submit is NOT permission to send another paid request.
 * existing_operation permits retrying that operation, never restarting generation. */
export class ImageGenerationError extends Error {
	constructor(
		readonly code: ImageGenerationErrorCode,
		message: string,
		readonly outcome: 'not_sent' | 'unknown' | 'existing_operation',
		readonly statusCode?: number,
	) {
		super(message)
		this.name = 'ImageGenerationError'
	}
}
