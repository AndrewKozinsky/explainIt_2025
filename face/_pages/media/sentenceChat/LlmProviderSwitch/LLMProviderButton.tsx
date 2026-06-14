import cn from 'classnames'
import BaseButton from 'ui/BaseButton/BaseButton'
import DeepseekButtonIcon from 'ui/icons/buttonIcons/DeepseekButtonIcon'
import GeminiButtonIcon from 'ui/icons/buttonIcons/GeminiButtonIcon'
import OpenAIButtonIcon from 'ui/icons/buttonIcons/OpenAIButtonIcon'
import { LlmProvider, useSentenceChatStore } from '../sentenceChatStore'

function LLMProviderButton({ activeProvider, provider }: { activeProvider: LlmProvider; provider: LlmProvider }) {
	const setLlmProvider = useSentenceChatStore((s) => s.setLlmProvider)
	const isActive = activeProvider === provider

	return (
		<BaseButton
			type='button'
			extraClass={cn('chat-input--llm-switch__button', isActive && 'chat-input--llm-switch__button--current')}
			onClick={() => setLlmProvider(provider)}
			disabled={isActive}
			theme='plain'
		>
			<LLMProviderButtonIcon provider={provider} />
		</BaseButton>
	)
}

export default LLMProviderButton

function LLMProviderButtonIcon({ provider }: { provider: LlmProvider }) {
	if (provider === 'gemini') {
		return <GeminiButtonIcon />
	} else if (provider === 'chatgpt') {
		return <OpenAIButtonIcon />
	} else {
		return <DeepseekButtonIcon />
	}
}
