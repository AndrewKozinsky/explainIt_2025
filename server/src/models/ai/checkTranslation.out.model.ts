import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

@ObjectType()
export class CheckTranslationOutErrorModel {
	@Field(() => String)
	error: string
}

@ObjectType()
export class CheckTranslationOutSuccessModel {
	@Field(() => Boolean)
	correct: boolean

	@Field(() => String)
	analysis: string
}

export const CheckTranslationOutModel = createUnionType({
	name: 'CheckTranslationOutModel',
	types: () => [CheckTranslationOutSuccessModel, CheckTranslationOutErrorModel],
	resolveType(value) {
		if ('error' in value) {
			return CheckTranslationOutErrorModel
		}
		return CheckTranslationOutSuccessModel
	},
})
