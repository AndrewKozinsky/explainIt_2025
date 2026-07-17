import { ApiError } from '@/shared/api/mutator'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'hasErrors'

export function setErrorsToForm(
	error: unknown,
	setFieldError: (field: any, params: any) => void,
	setFormError: React.Dispatch<React.SetStateAction<string | null>>,
) {
	if (!(error instanceof ApiError)) {
		setFormError(error instanceof Error ? error.message : 'Произошла ошибка')
		return
	}

	// Validation errors (400): [[{ field, messages }]]
	if (Array.isArray(error.body)) {
		error.body.forEach(({ field, messages }) => {
			setFieldError(field, {
				type: 'manual',
				message: messages.join(', '),
			})
		})
		return
	}

	// Domain errors (CustomError) and HttpExceptions: { message, ... }
	if (error.body && typeof error.body === 'object' && 'message' in error.body) {
		setFormError((error.body as { message: string }).message)
		return
	}

	setFormError('Произошла ошибка')
}
