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
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { AI_DIALOGUE_CEFR_LEVELS } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { CreateAiDialogueInput } from './createAiDialogue.input'
import { UpdateAiDialogueInput } from './updateAiDialogue.input'

const creation = { scenarioId: 1, sourceLanguageCode: 'en', targetLanguageCode: 'ru' }

describe.each([
	{ metatype: CreateAiDialogueInput, base: creation },
	{ metatype: UpdateAiDialogueInput, base: {} },
])('$metatype.name maxCefrLevel validation', ({ metatype, base }) => {
	it.each([...AI_DIALOGUE_CEFR_LEVELS, null])('accepts %s without coercing it', (maxCefrLevel) => {
		const result = plainToInstance(metatype, { ...base, maxCefrLevel })

		expect(validateSync(result, { whitelist: true, forbidNonWhitelisted: true })).toEqual([])
		expect(result.maxCefrLevel).toBe(maxCefrLevel)
	})

	it('preserves omission rather than turning it into null', () => {
		const result = plainToInstance(metatype, base)
		expect(validateSync(result)).toEqual([])
		expect(result.maxCefrLevel).toBeUndefined()
	})

	it.each(['C1', 'C2', 'a1', '', 1, true, ['A1'], { level: 'A1' }])('rejects %j', (maxCefrLevel) => {
		const result = plainToInstance(metatype, { ...base, maxCefrLevel })
		expect(validateSync(result)).toEqual([expect.objectContaining({ property: 'maxCefrLevel' })])
	})
})

it('exposes the allowed values and optional nullable input in OpenAPI metadata', () => {
	expect(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.max_cefr_level)).toMatchObject({
		enum: ['A1', 'A2', 'B1', 'B2'],
		type: 'string',
		required: false,
		nullable: true,
	})
})
