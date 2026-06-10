import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { LlmProvider } from './LlmProvider.interface'

// Карта всех LLM-провайдеров для внедрения в команды.
// Ключ — значение из TranslationProviderName: 'gemini' | 'chatgpt' | 'deepseek'.
export type LlmProviderMap = Record<TranslationProviderName, LlmProvider>
