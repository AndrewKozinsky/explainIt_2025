jest.mock('@nestjs/common', () => ({
	applyDecorators:
		(...decorators: PropertyDecorator[]) =>
		(target: object, key: string | symbol) => {
			decorators.forEach((decorator) => decorator(target, key))
		},
}))
jest.mock('@nestjs/swagger', () => ({ ApiProperty: () => () => undefined }))

import 'reflect-metadata'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { CheckAiDialogueUserMessageInput } from './checkAiDialogueUserMessage.input'

describe('CheckAiDialogueUserMessageInput', () => {
	it.each([
		{ speech: 'Hi' },
		{ action: 'I smile.' },
		{ speech: 'Hi', action: 'I smile.' },
		{ speech: null, action: 'I smile.' },
	])('accepts optional fields: %j', (input) => {
		expect(validateSync(plainToInstance(CheckAiDialogueUserMessageInput, input))).toEqual([])
	})

	it('trims text, preserves internal newlines and accepts 4000 characters', () => {
		const input = plainToInstance(CheckAiDialogueUserMessageInput, {
			speech: '  Hello\nthere  ',
			action: 'a'.repeat(4000),
		})

		expect(input.speech).toBe('Hello\nthere')
		expect(validateSync(input)).toEqual([])
	})

	it.each([1, false, [], {}, 'a'.repeat(4001)])('rejects invalid field values', (value) => {
		for (const field of ['speech', 'action']) {
			const input = plainToInstance(CheckAiDialogueUserMessageInput, { [field]: value })
			expect(validateSync(input)).toEqual([expect.objectContaining({ property: field })])
		}
	})

	it('rejects client-supplied history and language overrides with the application whitelist', () => {
		const input = plainToInstance(CheckAiDialogueUserMessageInput, {
			speech: 'Hi',
			sourceLanguageCode: 'en',
			context: [],
		})

		expect(validateSync(input, { whitelist: true, forbidNonWhitelisted: true })).toHaveLength(2)
	})
})
