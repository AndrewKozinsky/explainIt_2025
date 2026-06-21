import { useUserStore } from 'stores/userStore'
import { useSentenceChatStore } from '../sentenceChatStore'
import { getProviders } from './fn/llmProviders'
import LLMProviderButton from './LLMProviderButton'
import './LlmProviderSwitch.scss'

type LlmProviderSwitchProps = {
	smallIcons: boolean
}

function LlmProviderSwitch(props: LlmProviderSwitchProps) {
	const { smallIcons } = props

	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	const activeProvider = useSentenceChatStore((s) => s.llmProvider)

	if (!user || !hasBalance) {
		return null
	}

	return (
		<div className='chat-input--llm-switch'>
			{getProviders().map((provider) => {
				return (
					<LLMProviderButton
						provider={provider}
						activeProvider={activeProvider}
						key={provider}
						smallIcon={smallIcons}
					/>
				)
			})}
		</div>
	)
}

export default LlmProviderSwitch
