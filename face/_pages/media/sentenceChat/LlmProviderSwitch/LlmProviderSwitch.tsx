import { useUserStore } from 'stores/userStore'
import { LlmProvider, useSentenceChatStore } from '../sentenceChatStore'
import LLMProviderButton from './LLMProviderButton'
import './LlmProviderSwitch.scss'

const providers: LlmProvider[] = ['gemini', 'chatgpt', 'deepseek']

function LlmProviderSwitch() {
	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	const activeProvider = useSentenceChatStore((s) => s.llmProvider)

	if (!user || !hasBalance) {
		return null
	}

	return (
		<div className='chat-input--llm-switch'>
			{providers.map((provider) => {
				return <LLMProviderButton provider={provider} activeProvider={activeProvider} key={provider} />
			})}
		</div>
	)
}

export default LlmProviderSwitch
