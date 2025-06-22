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
	User: {
		dtoProps: {
			password: {
				type: 'string',
				minLength: 6,
				maxLength: 30,
				match: /[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
				matchErrorMessage:
					'Password must have min length is 6 and max length is 30 and contains letters, numbers and other symbols',
				description: "User's password",
				example: '$1Hn[595n8]T',
				required: true,
			},
		},
		dbFields: {
			id: {
				type: 'index',
			},
			email: {
				type: 'email',
				unique: true,
				description: "User's email",
				required: true,
			},
			password: {
				type: 'string',
				description: "Hashed user's password",
				example: 'z151JPS16jz151JPS16j',
				required: true,
			},
		}
	}
} satisfies BdConfig.Root
