'use client'

import Button from '@/ui/formRelated/buttons/Button/Button'
import { LlmProvider, useSentenceChatStore } from '../sentenceChatStore'

const providers: Array<{ key: LlmProvider; label: string }> = [
	{ key: 'gemini', label: 'Gemini' },
	{ key: 'chatgpt', label: 'ChatGPT' },
	{ key: 'deepseek', label: 'DeepSeek' },
]

function LlmProviderSwitch() {
	const llmProvider = useSentenceChatStore((s) => s.llmProvider)
	const setLlmProvider = useSentenceChatStore((s) => s.setLlmProvider)

	return (
		<div className='chat-input__llm-switch'>
			{providers.map(function (p) {
				const isActive = llmProvider === p.key

				return (
					<Button
						type='button'
						key={p.key}
						onClick={() => setLlmProvider(p.key)}
						theme='outline'
						size='small'
						disabled={isActive}
					>
						{p.label}
					</Button>
				)
			})}
		</div>
	)
}

export default LlmProviderSwitch
