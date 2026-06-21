import { mainConfig } from '@/сonsts/mainConfig'
import { LlmProvider } from '../../sentenceChatStore'

export function getProviders(): LlmProvider[] {
	if (mainConfig.region === 'intl') {
		return ['deepseek', 'gemini', 'chatgpt']
	}

	// Для российской версии исключаем ChatGPT
	return ['deepseek', 'gemini']
}
