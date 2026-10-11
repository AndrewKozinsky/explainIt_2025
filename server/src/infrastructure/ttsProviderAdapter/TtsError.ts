export type TtsErrorCode = 'invalid_input' | 'configuration' | 'aborted' | 'request_failed' | 'invalid_response'

/** No SDK errors, credentials or input text. An unknown outcome must not trigger an automatic retry. */
export class TtsError extends Error {
	constructor(
		readonly code: TtsErrorCode,
		message: string,
		readonly outcome: 'not_sent' | 'unknown',
	) {
		super(message)
		this.name = 'TtsError'
	}
}
