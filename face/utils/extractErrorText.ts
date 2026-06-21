import { ApolloError } from '@apollo/client'
import { ServerErrorMessage, serverErrorMessagesByCode, errorMessages } from './errorMessages'

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Extracts a human-readable error text from **any** error shape.
 *
 * Extraction priority:
 * 1. ApolloError → `graphQLErrors[0].extensions.message` → lookup by `errorMessageCode`
 * 2. `ServerErrorMessage` object → lookup by `errorMessageCode`
 * 3. JSON string / `Error.message` that parses to `ServerErrorMessage`
 * 4. Plain string / `Error.message` that matches a known code
 * 5. `fallbackCode` parameter (a known `errorMessageCode`)
 * 6. `'UNKNOWN_ERROR'` → {@link getTextByServerErrorMessage}
 *
 * @param error      Any error thrown by GraphQL, fetch, or application code.
 * @param fallbackCode  A server `errorMessageCode` used when no code can be extracted.
 *                      Pass e.g. `'UNKNOWN_ERROR'` or any other key from
 *                      {@link serverErrorMessagesByCode}.
 */
export function getTextByUnknownError(error: unknown, fallbackCode?: string): string {
	// ApolloError — extract from the formal GraphQL extensions path
	if (error instanceof ApolloError) {
		const extensionsMessage = error.graphQLErrors[0]?.extensions?.message

		if (extensionsMessage !== undefined) {
			const code = tryExtractErrorCode(extensionsMessage)
			if (code) {
				return getTextByServerErrorMessage({ errorMessageCode: code })
			}
		}
	}

	const code = tryExtractErrorCode(error) ?? fallbackCode ?? 'UNKNOWN_ERROR'
	return getTextByServerErrorMessage({ errorMessageCode: code })
}

/**
 * Type guard: checks whether `message` is a {@link ServerErrorMessage}.
 */
function isServerErrorMessage(message: unknown): message is ServerErrorMessage {
	return typeof message === 'object' && !!message && 'errorMessageCode' in message
}

/**
 * Resolves a human-readable Russian text for a server error message.
 *
 * Accepts both a raw JSON string and a parsed {@link ServerErrorMessage} object.
 * Falls back to {@link errorMessages.unknownServerError} when the code is unrecognised.
 */
export function getTextByServerErrorMessage(message: unknown): string {
	if (typeof message === 'string') {
		try {
			return getTextByServerErrorMessage(JSON.parse(message))
		} catch {
			return message
		}
	}

	if (!isServerErrorMessage(message)) {
		return errorMessages.unknownServerError
	}

	const resolver = serverErrorMessagesByCode[message.errorMessageCode]

	if (typeof resolver === 'function') return resolver(message)
	if (typeof resolver === 'string') return resolver

	return errorMessages.unknownServerError
}

// ─── Private helpers ────────────────────────────────────────────────

/**
 * Tries to extract a server `errorMessageCode` from any error shape.
 * Returns `null` when no code can be recognised.
 */
function tryExtractErrorCode(error: unknown): null | string {
	// 1. Direct ServerErrorMessage object
	if (isServerErrorMessage(error)) {
		return error.errorMessageCode
	}

	// 2. Plain string — could be a JSON blob or a bare error code
	if (typeof error === 'string') {
		// 2a. Try to parse as JSON → { errorMessageCode: "..." }
		try {
			const parsed = JSON.parse(error)
			if (isServerErrorMessage(parsed)) return parsed.errorMessageCode
		} catch {
			/* not JSON — continue below */
		}

		// 2b. Check whether the string itself is a known code
		if (serverErrorMessagesByCode[error]) return error

		return null
	}

	// 3. Error instance (including ApolloError — handled before calling this helper)
	if (error instanceof Error) {
		// 3a. Try to parse error.message as JSON
		try {
			const parsed = JSON.parse(error.message)
			if (isServerErrorMessage(parsed)) return parsed.errorMessageCode
		} catch {
			/* not JSON — continue below */
		}

		// 3b. Check whether error.message is a known code
		if (error.message && serverErrorMessagesByCode[error.message]) return error.message

		return null
	}

	return null
}
