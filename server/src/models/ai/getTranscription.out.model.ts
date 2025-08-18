import { Field, ObjectType, createUnionType } from '@nestjs/graphql'

@ObjectType()
export class GetTranscriptionOutErrorModel {
	@Field(() => String)
	error: string
}

@ObjectType()
export class GetTranscriptionOutSuccessModel {
	@Field(() => String)
		transcription: string
}

export const GetTranscriptionOutModel = createUnionType({
	name: 'GetTranscriptionOutModel',
	types: () => [GetTranscriptionOutSuccessModel, GetTranscriptionOutErrorModel],
	resolveType(value) {
		if ('error' in value) {
			return GetTranscriptionOutErrorModel
		}
		return GetTranscriptionOutSuccessModel
	},
})
