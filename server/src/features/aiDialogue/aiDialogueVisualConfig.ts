import { OpenAIImageModels } from 'types/imageGenerationModels'

/** Версия геометрии спрайта, не художественного стиля. Нужна для координат существующих листов. */
export const AI_DIALOGUE_EMOTION_LAYOUT_VERSION = 'emotion-grid-4x3-v1'
/** Быстрая модель для повседневной генерации; low сохраняет минимальную стоимость для новых аватаров и сцен. */
export const AI_DIALOGUE_IMAGE_MODEL = OpenAIImageModels.Flare
export const AI_DIALOGUE_IMAGE_QUALITY = 'low'
export const AI_DIALOGUE_IMAGE_FORMAT = 'png'
export const AI_DIALOGUE_EMOTION_SHEET_SIZE = { width: 960, height: 720 } as const
export const AI_DIALOGUE_SCENE_SIZE = { width: 1152, height: 576 } as const
