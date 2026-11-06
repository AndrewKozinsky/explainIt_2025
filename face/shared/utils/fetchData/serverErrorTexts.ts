import { createTranslator } from 'next-intl'
import deServerErrors from '@/messages/de/serverErrors.json'
import enServerErrors from '@/messages/en/serverErrors.json'
import esServerErrors from '@/messages/es/serverErrors.json'
import frServerErrors from '@/messages/fr/serverErrors.json'
import itServerErrors from '@/messages/it/serverErrors.json'
import ruServerErrors from '@/messages/ru/serverErrors.json'
import trServerErrors from '@/messages/tr/serverErrors.json'
import { type LanguageCode, languageKeys } from '@/shared/utils/languages'

/** Код ошибки сервера — ключ в messages/{locale}/serverErrors.json */
export type ServerErrorCode = keyof typeof enServerErrors

/** Параметры текста ошибки из тела ответа: fieldName, minNumber, maxNumber и т. п. */
export type ServerErrorParams = Record<string, unknown>

const serverErrorTextsByLanguage: Record<LanguageCode, Record<ServerErrorCode, string>> = {
	de: deServerErrors,
	en: enServerErrors,
	es: esServerErrors,
	fr: frServerErrors,
	it: itServerErrors,
	ru: ruServerErrors,
	tr: trServerErrors,
}

/** Параметры, которые встречаются в текстах ошибок; без значения подставляется пустая строка */
const knownParamNames = ['fieldName', 'minNumber', 'maxNumber']

/**
 * Текст ошибки сервера по коду на языке интерфейса.
 * Неизвестный язык заменяется английским, неизвестный код — UNKNOWN_ERROR («Неизвестная ошибка сервера»).
 */
export function translateServerError(code: string, params: ServerErrorParams, locale: null | string): string {
	const language = (languageKeys as readonly string[]).includes(locale ?? '') ? (locale as LanguageCode) : 'en'
	const serverErrorTexts = serverErrorTextsByLanguage[language]
	const knownCode: ServerErrorCode = code in serverErrorTexts ? (code as ServerErrorCode) : 'UNKNOWN_ERROR'

	const translate = createTranslator({ locale: language, messages: serverErrorTexts })

	return translate(knownCode, getTextParams(params))
}

function getTextParams(params: ServerErrorParams): Record<string, string | number> {
	const textParams: Record<string, string | number> = {}

	for (const paramName of knownParamNames) {
		const paramValue = params[paramName]

		textParams[paramName] =
			typeof paramValue === 'number' ? paramValue : paramValue == null ? '' : String(paramValue)
	}

	return textParams
}
