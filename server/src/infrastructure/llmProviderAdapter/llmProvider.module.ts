import { Module } from '@nestjs/common'
import { ChatGptLlmProvider } from './ChatGptLlmProvider.service'
import { DeepSeekLlmProvider } from './DeepSeekLlmProvider.service'
import { GeminiLlmProvider } from './GeminiLlmProvider.service'
import { LlmAdapterService } from './LlmAdapter.service'
import { MimoLlmProvider } from './MimoLlmProvider.service'
import { ZaiLlmProvider } from './ZaiLlmProvider.service'

const internalProviders = [GeminiLlmProvider, ChatGptLlmProvider, DeepSeekLlmProvider, ZaiLlmProvider, MimoLlmProvider]

@Module({
	providers: [...internalProviders, LlmAdapterService],
	exports: [LlmAdapterService],
})
export class LlmProviderModule {}
