import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { aiDialogueIllustrationStyleCatalog, AiDialogueIllustrationStyleCatalog } from './catalog'

const styleIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
const styleFilePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:webp|png|jpg|jpeg)$/
const modes = ['localtest', 'localdev', 'localcheckserver', 'serverdevelop', 'servermaster']

/** Проверяет каталог без фиксированного списка id, enum БД или внешних запросов. */
export function getAiDialogueIllustrationStyleCatalog(
	catalog: AiDialogueIllustrationStyleCatalog = aiDialogueIllustrationStyleCatalog,
): AiDialogueIllustrationStyleCatalog {
	const ids = catalog.styles.map((style) => style.id)

	const invalid = catalog.styles.some(
		(style) =>
			!styleIdPattern.test(style.id) ||
			style.id.length > 64 ||
			!styleFilePattern.test(style.file) ||
			!style.stylePrompt.trim() ||
			!style.titleKey.trim(),
	)

	if (invalid || new Set(ids).size !== ids.length || !ids.includes(catalog.defaultStyleId)) {
		throw new CustomError(
			errorMessage.aiDialogue.invalidIllustrationStyleCatalog,
			ErrorStatusCode.InternalServerError_500,
		)
	}

	return catalog
}

/** Отсутствие/null выбирает стиль по умолчанию; клиент не может передать произвольный ключ R2. */
export function getNewAiDialogueIllustrationStyle(id?: string | null) {
	const catalog = getAiDialogueIllustrationStyleCatalog()

	const style = catalog.styles.find((item) => item.id === (id ?? catalog.defaultStyleId))
	if (!style) {
		throw new CustomError(errorMessage.aiDialogue.illustrationStyleNotFound, ErrorStatusCode.BadRequest_400)
	}

	return style
}

export function getAiDialogueIllustrationStyleKey(mode: string | undefined, file: string): string {
	if (!mode || !modes.includes(mode) || !styleFilePattern.test(file)) {
		throw new CustomError(
			errorMessage.aiDialogue.invalidIllustrationStyleCatalog,
			ErrorStatusCode.InternalServerError_500,
		)
	}

	return `ai-dialogue-images/shared/styles/${mode}/${file}`
}

export type AiDialogueImageStyleSnapshot = {
	illustrationStyleId: string
	stylePrompt: string
	styleAvatarReferenceS3Key: string
	styleSceneReferenceS3Key: string
}

/** Фиксирует выбранный в БД стиль для новых заданий; worker не перечитывает каталог. */
export function getAiDialogueImageStyleSnapshot(
	illustrationStyleId: string,
	mode: string | undefined,
): AiDialogueImageStyleSnapshot {
	const style = getAiDialogueIllustrationStyleCatalog().styles.find((item) => item.id === illustrationStyleId)
	if (!style) {
		throw new CustomError(
			errorMessage.aiDialogue.invalidIllustrationStyleCatalog,
			ErrorStatusCode.InternalServerError_500,
		)
	}

	const styleReferenceS3Key = getAiDialogueIllustrationStyleKey(mode, style.file)

	return {
		illustrationStyleId: style.id,
		stylePrompt: style.stylePrompt,
		styleAvatarReferenceS3Key: styleReferenceS3Key,
		styleSceneReferenceS3Key: styleReferenceS3Key,
	}
}
