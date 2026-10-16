import cn from 'classnames'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import DeepseekButtonIcon from '@/shared/ui/icons/buttonIcons/standard/DeepseekButtonIcon'
import DeepseekLiteButtonIcon from '@/shared/ui/icons/buttonIcons/standard/DeepseekLiteButtonIcon'
import GeminiButtonIcon from '@/shared/ui/icons/buttonIcons/standard/GeminiButtonIcon'
import GeminiLiteButtonIcon from '@/shared/ui/icons/buttonIcons/standard/GeminiLiteButtonIcon'
import OpenAIButtonIcon from '@/shared/ui/icons/buttonIcons/standard/OpenAIButtonIcon'
import OpenAILiteButtonIcon from '@/shared/ui/icons/buttonIcons/standard/OpenAILiteButtonIcon'
import { LlmProvider, useSentenceChatStore } from '../sentenceChatStore'

type LLMProviderButtonProps = {
	activeProvider: LlmProvider
	provider: LlmProvider
	smallIcon: boolean
}

function LLMProviderButton(props: LLMProviderButtonProps) {
	const { activeProvider, provider, smallIcon } = props

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
			<LLMProviderButtonIcon provider={provider} smallIcon={smallIcon} />
		</BaseButton>
	)
}

export default LLMProviderButton

function LLMProviderButtonIcon({ provider, smallIcon }: { provider: LlmProvider; smallIcon: boolean }) {
	if (provider === 'gemini') {
		return smallIcon ? <GeminiLiteButtonIcon /> : <GeminiButtonIcon />
	} else if (provider === 'chatgpt') {
		return smallIcon ? <OpenAILiteButtonIcon /> : <OpenAIButtonIcon />
	} else {
		return smallIcon ? <DeepseekLiteButtonIcon /> : <DeepseekButtonIcon />
	}
}
