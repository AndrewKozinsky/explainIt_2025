import { useUserStore } from 'stores/userStore'

export function useIsSendButtonDisabled(isGenerating: boolean, prompt: string): boolean {
	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	return !user || !hasBalance || isGenerating || !prompt
}
