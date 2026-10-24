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
import { GetUserDialoguesInput } from './getUserDialogues.input'

function validate(query: object) {
	return validateSync(plainToInstance(GetUserDialoguesInput, query), {
		whitelist: true,
		forbidNonWhitelisted: true,
	})
}

describe('GetUserDialoguesInput', () => {
	it('transforms valid query strings while preserving omitted defaults for the controller', () => {
		expect(validate({})).toEqual([])
		expect(validate({ page: '2', pageSize: '100' })).toEqual([])
		expect(plainToInstance(GetUserDialoguesInput, { page: '2', pageSize: '3' })).toMatchObject({
			page: 2,
			pageSize: 3,
		})
	})

	it.each([
		{ page: '0' },
		{ page: '-1' },
		{ page: '1.5' },
		{ page: 'abc' },
		{ pageSize: '0' },
		{ pageSize: '-1' },
		{ pageSize: '1.5' },
		{ pageSize: '101' },
		{ pageSize: 'abc' },
		{ page: ['1', '2'] },
		{ userId: '8' },
	])('rejects invalid or unknown pagination fields %j', (query) => {
		expect(validate(query).length).toBeGreaterThan(0)
	})
})
