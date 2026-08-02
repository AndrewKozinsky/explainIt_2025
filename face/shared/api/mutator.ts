/**
 * Custom mutator for Orval-generated API calls.
 *
 * Why: the default fetch client does NOT throw on 4xx/5xx responses.
 * React Query treats a resolved promise as success — so a 404 would land
 * in `data` instead of `error`. This mutator throws on non-ok responses
 * so React Query can catch the error and expose it via `isError` / `error`.
 *
 * Возвращает объект в формате { data, status, headers } — именно такой
 * структуры ожидает Orval для генерации корректных типов ответа.
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

export async function customMutator<TResponse = unknown>(url: string, options?: RequestInit): Promise<TResponse> {
	// When running on the server (Server Components), relative URLs need an absolute base.
	// In Docker, the Next.js server cannot reach nginx via localhost — use the internal
	// Docker hostname of the server container directly.
	//
	// We also forward the incoming request's cookies so that API calls during SSR
	// include the user's session cookie — without this, the server-side fetch has no
	// access to browser cookies and the API sees every request as unauthenticated.
	if (typeof window === 'undefined' && url.startsWith('/')) {
		const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://explainserverlocaldev:3001'
		url = apiBase + url

		try {
			const { cookies } = await import('next/headers')
			const cookieStore = await cookies()
			const allCookies = cookieStore.getAll()
			const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ')
			if (cookieHeader) {
				options = {
					...options,
					headers: {
						...options?.headers,
						Cookie: cookieHeader,
					},
				}
			}
		} catch {
			// Not inside a request context (e.g. generateStaticParams, build time).
			// Proceed without cookies — the API will treat this as unauthenticated.
		}
	}

	const res = await fetch(url, {
		...options,
		credentials: 'include', // Send session cookie (client-side)
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

	// Orval expects the mutator to return { data, status, headers }.
	// This contract must be kept so that generated response types match reality.
	//
	// .catch(() => null) handles empty response bodies — NestJS Express adapter
	// calls res.send() (no args) for null/undefined controller return values,
	// which sends an empty body that JSON.parse rejects as SyntaxError.
	const data = res.status === 204 ? undefined : await res.json().catch(() => null)

	return {
		data,
		status: res.status,
		headers: res.headers,
	} as TResponse
}
