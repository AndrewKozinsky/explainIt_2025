import { useUser } from '@/shared/api/auth/UserProvider'

/**
 * Исчерпан ли дневной баланс ИИ у вошедшего пользователя.
 * Баланс обновляется в реальном времени (`UserProvider`), поэтому значение меняется само после начисления.
 * Без пользователя — false: гостю показываются приглашения войти, а не лимит.
 */
export function useIsBalanceExhausted(): boolean {
	const user = useUser()

	return user !== null && user.balance <= 0
}
