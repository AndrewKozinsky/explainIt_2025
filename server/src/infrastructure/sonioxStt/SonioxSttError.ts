export type SonioxSttErrorCode =
	| 'invalid_input'
	| 'configuration'
	| 'connection_failed'
	| 'request_failed'
	| 'invalid_response'
	| 'timeout'
	| 'aborted'
	| 'session_closed'
	| 'buffer_overflow'

/** Provider error bodies, audio, credentials and raw network errors are never exposed. */
export class SonioxSttError extends Error {
	constructor(
		readonly code: SonioxSttErrorCode,
		message: string,
	) {
		super(message)
		this.name = 'SonioxSttError'
	}
}
