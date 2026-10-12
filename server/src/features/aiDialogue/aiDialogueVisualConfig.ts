/** Общая инструкция стиля. Изменения применяются к новым заданиям; готовые изображения остаются. */
export const AI_DIALOGUE_VISUAL_STYLE_PROMPT =
	'Modern editorial illustration with subtle graphic-novel influences. Realistic adult proportions, clean soft outlines, simplified shapes, light texture and soft shadows. Calm moderately warm palette with one or two brighter accents. Expressive readable faces. No photorealism, caricature proportions, 3D rendering, text, frames, UI elements or watermarks.'

/** Версия геометрии спрайта, не художественного стиля. Нужна для координат существующих листов. */
export const AI_DIALOGUE_EMOTION_LAYOUT_VERSION = 'emotion-grid-4x3-v1'
/** Самая дешёвая поддерживаемая модель; low сохраняет минимальную стоимость для новых аватаров и сцен. */
export const AI_DIALOGUE_IMAGE_MODEL = 'gpt-image-2'
export const AI_DIALOGUE_IMAGE_QUALITY = 'low'
export const AI_DIALOGUE_IMAGE_FORMAT = 'png'
export const AI_DIALOGUE_EMOTION_SHEET_SIZE = { width: 960, height: 720 } as const
export const AI_DIALOGUE_SCENE_SIZE = { width: 1152, height: 576 } as const

/** Единственный художественный эталон для новых спрайтов NPC и сцен. */
export const AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY = 'ai-dialogue-images/shared/style-scene.jpg'
export const AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY = AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY
