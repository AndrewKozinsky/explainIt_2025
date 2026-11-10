import { AiModel, DeepSeekModels } from 'types/AIModels'

/**
 * Модель всех запросов диалога с ИИ: генерация хода, сжатие истории, проверка черновика.
 * Задана явно, а не через DEFAULT_FLASH_AI_MODEL: диалогу нужна модель, которая точно соблюдает построчный формат.
 */
export const AI_DIALOGUE_MODEL: AiModel = DeepSeekModels.Flash
