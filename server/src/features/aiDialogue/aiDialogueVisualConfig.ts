/** Общая инструкция стиля. Изменения применяются к новым заданиям; готовые изображения остаются. */
export const AI_DIALOGUE_VISUAL_STYLE_PROMPT =
	'Modern editorial illustration with subtle graphic-novel influences. Realistic adult proportions, clean soft outlines, simplified shapes, light texture and soft shadows. Calm moderately warm palette with one or two brighter accents. Expressive readable faces. No photorealism, caricature proportions, 3D rendering, text, frames, UI elements or watermarks.'

/** Версия геометрии спрайта, не художественного стиля. Нужна для координат существующих листов. */
export const AI_DIALOGUE_EMOTION_LAYOUT_VERSION = 'emotion-grid-4x3-v1'
export const FLUX_3_IMAGE_MODEL = 'flux-3-image'

/** Ключ объекта в R2, не путь к исходникам. Локальный исходник: server/assets/aiDialogue/user-avatar.jpg. В R2 пользователь загрузил вариант .jpg. */
export const AI_DIALOGUE_USER_AVATAR_S3_KEY = 'ai-dialogue-images/shared/user-avatar.jpg'

/** Ключи загруженных эталонов стиля в R2 для новых заданий; старые снимки могут не содержать эталоны. */
export const AI_DIALOGUE_STYLE_AVATAR_REFERENCE_S3_KEY = AI_DIALOGUE_USER_AVATAR_S3_KEY
export const AI_DIALOGUE_STYLE_SCENE_REFERENCE_S3_KEY = 'ai-dialogue-images/shared/style-scene.jpg'
