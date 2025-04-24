import { BdConfig } from './dbConfigType'

/**
 * Database structure.
 * With help of this structure, it is formed schema.prisma and class-validator set of decorators to check fields in DTO.
 */
export const bdConfig = {
	AI: {
		dtoProps: {
			rusSentence: {
				type: 'string',
				minLength: 5,
				maxLength: 120,
				description: 'Sentence in Russian',
				example: 'Он часто бегает',
				required: true,
			},
			engSentence: {
				type: 'string',
				minLength: 1,
				maxLength: 120,
				description: 'Sentence in English',
				example: 'He often runs',
				required: true,
			},
		},
		dbFields: {},
	},
} satisfies BdConfig.Root
