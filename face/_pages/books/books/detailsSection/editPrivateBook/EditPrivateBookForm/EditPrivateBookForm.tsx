import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
import { ChangeBookFormData, changeBookFormSchema, ChangeBookFormTest } from './fn/form'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateBookFormSubmit } from './fn/submit'
import EditDetailsFormHeader from '../../common/EditDetailsFormHeader/EditDetailsFormHeader'

export default function EditBookForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setError,
	} = useForm<ChangeBookFormData>({
		resolver: yupResolver(changeBookFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateBookFormSubmit(setError, setFormStatus, setFormError)

	return (
		<>
			<EditDetailsFormHeader />
			<form onSubmit={handleSubmit(onSubmit)} data-testid={ChangeBookFormTest.form.id}>
				<BookFormSurface
					leftBottomButtons={[<DeleteBookButton key='delete' />]}
					rightBottomButtons={[
						<Button
							type='submit'
							disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
							loading={formStatus === 'submitting'}
							dataTestId={ChangeBookFormTest.submitButton.id}
							key='save'
						>
							Сохранить
						</Button>,
					]}
				>
					<FormFieldsWrapper gap='big'>
						<TextInput
							label='Автор'
							error={errors.author?.message}
							dataTestId={ChangeBookFormTest.authorField.id}
							inputProps={{
								...register('author'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Lewis Carroll',
							}}
						/>
						<TextInput
							label='Название'
							error={errors.name?.message}
							dataTestId={ChangeBookFormTest.nameField.id}
							inputProps={{
								...register('name'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Adventures in Wonderland',
							}}
						/>
						<TextInput
							label='Заметка'
							error={errors.note?.message}
							dataTestId={ChangeBookFormTest.noteField.id}
							inputProps={{
								...register('note'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
							}}
						/>
						<FormError text={formError} dataTestId={ChangeBookFormTest.failMessage.id} />
					</FormFieldsWrapper>
				</BookFormSurface>
			</form>
		</>
	)
}
