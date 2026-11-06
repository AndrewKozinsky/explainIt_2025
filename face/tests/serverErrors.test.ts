import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { ApiError } from '@/shared/api/mutator'
import { resolveError, resolveErrorByCode } from '@/shared/utils/fetchData/resolveError'
import { translateServerError } from '@/shared/utils/fetchData/serverErrorTexts'
import { languageKeys } from '@/shared/utils/languages'

test('server error texts exist for the same codes in every language', () => {
	const codesByLanguage = languageKeys.map((language) => {
		const serverErrorTexts = JSON.parse(readFileSync(`messages/${language}/serverErrors.json`, 'utf8'))
		return Object.keys(serverErrorTexts).sort().join(',')
	})

	assert.equal(new Set(codesByLanguage).size, 1)
})

test('server error is translated to the interface language', () => {
	assert.equal(translateServerError('BOOK_NOT_FOUND', {}, 'de'), 'Buch nicht gefunden.')
	assert.equal(translateServerError('BOOK_NOT_FOUND', {}, 'ru'), 'Книга не найдена.')
})

test('unknown language falls back to English, unknown code to UNKNOWN_ERROR', () => {
	assert.equal(translateServerError('BOOK_NOT_FOUND', {}, null), 'Book not found.')
	assert.equal(translateServerError('BOOK_NOT_FOUND', {}, 'pt'), 'Book not found.')
	assert.equal(translateServerError('NO_SUCH_CODE', {}, 'fr'), 'Erreur inconnue du serveur.')
})

test('text params come from the error body; a missing param becomes empty', () => {
	const minCharactersError = { code: 'MIN_CHARACTERS', minNumber: 6 }
	assert.equal(resolveErrorByCode('MIN_CHARACTERS', minCharactersError, 'en'), 'Minimum number of characters: 6')

	const mustBeStringError = { code: 'MUST_BE_STRING', fieldName: 'name' }
	assert.equal(resolveErrorByCode('MUST_BE_STRING', mustBeStringError, 'tr'), 'name metin olmalıdır.')

	assert.equal(translateServerError('MUST_BE_STRING', {}, 'en'), ' must be a string.')
})

test('error code is read both from a message object and from a JSON string', () => {
	const objectMessageError = new ApiError(500, { message: { code: 'MIN_CHARACTERS', minNumber: 3 }, statusCode: 500 })
	assert.equal(resolveError(objectMessageError, 'de'), 'Mindestanzahl an Zeichen: 3')

	const stringMessageError = new ApiError(404, { message: '{"code":"BOOK_NOT_FOUND"}', statusCode: 404 })
	assert.equal(resolveError(stringMessageError, 'it'), 'Libro non trovato.')

	const codelessError = new ApiError(404, { message: 'Cannot GET /api/books/1', statusCode: 404 })
	assert.equal(resolveError(codelessError, 'es'), 'Error desconocido del servidor.')
})
