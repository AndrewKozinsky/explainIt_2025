// import { useUserStore } from 'stores/userStore'

/*export function useIsSendButtonDisabled(isGenerating: boolean, prompt: string): boolean {
	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	// Во время генерации показывается кнопка отмены — она должна быть активной.
	if (isGenerating) return false

	// Для отправки — прежняя логика блокировки.
	return !user || !hasBalance || !prompt
}*/
