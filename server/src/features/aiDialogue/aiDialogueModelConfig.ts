import { AiModel, DeepSeekModels, OpenAIModels } from 'types/AIModels'
import type { LlmGenerateInput } from 'infrastructure/llmProviderAdapter/LlmProvider.interface'

/**
 * Модель генерации хода и сжатия истории диалога с ИИ.
 * Задана явно, а не через DEFAULT_FLASH_AI_MODEL: диалогу нужна модель, которая точно соблюдает построчный формат.
 */
export const AI_DIALOGUE_MODEL: AiModel = DeepSeekModels.Flash

/**
 * Модель и усилие рассуждения для проверки черновика. Выбраны по замеру на 24 фразах (14 верных, 10 с ошибками):
 * эта пара дала 0 ложных блокировок из 168 проверок, 0 пропущенных ошибок из 120 и ни одного нарушения формата
 * при медиане ответа 2 с. DeepSeek Flash без рассуждения — 4 % ложных блокировок и 10 % пропусков,
 * с рассуждением low — 2,5 % пропусков. Без рассуждения ошибаются и более сильные модели.
 */
export const AI_DIALOGUE_MESSAGE_CHECK_MODEL: AiModel = OpenAIModels.Nano
export const AI_DIALOGUE_MESSAGE_CHECK_REASONING_EFFORT = 'low' satisfies LlmGenerateInput['reasoningEffort']
