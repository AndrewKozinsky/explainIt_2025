import { cookies } from 'next/headers'
import { userService } from '@/entities/user/UserService'
import type { UserModel } from '@/entities/user/UserService'

/**
 * SSR-адаптер: без сессии возвращает null, иначе читает пользователя через доменный сервис.
 * Адрес сервера и передача cookie обрабатываются общим API-mutator.
 */
export async function getCurrentUser(): Promise<UserModel | null> {
	const cookieStore = await cookies()
	if (!cookieStore.get('session')) return null

	try {
		const result = await userService.getMe()
		return result.error || result.errors ? null : result.data
	} catch {
		return null
	}
}
