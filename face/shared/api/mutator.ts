/**
 * Custom mutator for Orval-generated API calls.
 *
 * Why: the default fetch client does NOT throw on 4xx/5xx responses.
 * React Query treats a resolved promise as success — so a 404 would land
 * in `data` instead of `error`. This mutator throws on non-ok responses
 * so React Query can catch the error and expose it via `isError` / `error`.
 *
 * Страница не упадёт: React Query ловит исключения из queryFn безопасно.
 */

export class ApiError extends Error {
	status: number
	body: unknown

	constructor(status: number, body: unknown) {
		super(`API error ${status}`)
		this.name = 'ApiError'
		this.status = status
		this.body = body
	}
}

export async function customMutator<TResponse = unknown>(
	url: string,
	options?: RequestInit,
): Promise<TResponse> {
	const res = await fetch(url, {
		...options,
		credentials: 'include', // Send session cookie
	})

	if (!res.ok) {
		let body: unknown
		try {
			body = await res.json()
		} catch {
			body = await res.text()
		}
		throw new ApiError(res.status, body)
	}

	// 204 No Content — nothing to parse
	if (res.status === 204) {
		return undefined as TResponse
	}

	return res.json()
}
