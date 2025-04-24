import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

@ObjectType()
export class ErrorResult {
	@Field(() => String)
	error: string
}

@ObjectType()
export class SuccessResult {
	@Field(() => Boolean)
	correct: boolean

	@Field(() => String)
	analysis: string
}

export const CheckTranslationOutModel = createUnionType({
	name: 'CheckTranslationOutModel',
	types: () => [SuccessResult, ErrorResult],
	resolveType(value) {
		if ('error' in value) {
			return ErrorResult
		}
		return SuccessResult
	},
})
