import { extractGraphQLError } from '@/graphql/extractGraphQLError'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'hasErrors'

export function setErrorsToForm(
	gqError: unknown,
	setFieldError: (field: any, params: any) => void,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	const graphQLExtension = extractGraphQLError(gqError)
	if (!graphQLExtension) return

	setFormError(graphQLExtension.message)

	if (!graphQLExtension.validationErrors) return

	graphQLExtension.validationErrors.forEach(({ field, messages }) => {
		setFieldError(field, {
			type: 'manual',
			message: messages.join(', '),
		})
	})
}
