import { cookies } from 'next/headers'
import type { UserModel } from '@/entites/auth/repository/AuthRepository'

/**
 * Fetches the current user on the server side by forwarding the session cookie
 * to the NestJS API. Called from Server Components (layout, page).
 *
 * In Docker, Next.js and NestJS are in the same Docker network.
 * NestJS is reachable at its service name: explainserver{MODE}:3001
 * (e.g. explainserverlocaldev:3001, explainserverlocaltest:3001,
 *  explainserverserverdevelop:3001).
 *
 * The MODE env var is already set in every container by docker-compose.
 * Falls back to localhost:3001 when running outside Docker (e.g. direct `npm run dev`).
 */

const API_INTERNAL_URL = getApiInternalUrl()

export async function getCurrentUser(): Promise<UserModel | null> {
	const cookieStore = await cookies()
	const sessionCookie = cookieStore.get('session')

	if (!sessionCookie) {
		return null
	}

	try {
		const res = await fetch(`${API_INTERNAL_URL}/api/auth/me`, {
			headers: { Cookie: `${sessionCookie.name}=${sessionCookie.value}` },
			cache: 'no-store',
		})

		if (!res.ok) {
			return null
		}

		return res.json()
	} catch {
		// Network error (NestJS not reachable) — not a crash, just no user
		return null
	}
}

function getApiInternalUrl(): string {
	const mode = process.env.MODE
	if (mode) {
		return `http://explainserver${mode}:3001`
	}
	// Running outside Docker — NestJS on localhost
	return 'http://localhost:3001'
}
