import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import InputFieldsOverrider from '../../common/InputFieldsOverrider/InputFieldsOverrider'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
import { ChangeBookFormData, changeBookFormSchema, ChangeBookFormTest } from './fn/form'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateBookFormSubmit } from './fn/submit'
import { BookOutModel } from '@/graphql'

type ChangeBookFormProps = {
	book: BookOutModel
}

export default function EditBookForm(props: ChangeBookFormProps) {
	const { book } = props

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

	useSetFieldValues(reset, book)

	const onSubmit = useGetOnUpdateBookFormSubmit(book.id, setError, setFormStatus, setFormError)

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid={ChangeBookFormTest.form.id}>
			<BookFormSurface
				leftBottomButtons={[<DeleteBookButton key='delete' bookId={book.id} />]}
				rightBottomButtons={[
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
						dataTestId={ChangeBookFormTest.submitButton.id}
						key='save'
					>
						Сохранить
					</Button>,
				]}
			>
				<FormFieldsWrapper gap='big'>
					<InputFieldsOverrider>
						<TextInput
							label='Автор'
							error={errors.author?.message}
							dataTestId={ChangeBookFormTest.authorField.id}
							inputProps={{
								...register('author', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Lewis Carroll',
							}}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider size='big'>
						<TextInput
							label='Название'
							error={errors.name?.message}
							dataTestId={ChangeBookFormTest.nameField.id}
							inputProps={{
								...register('name', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Adventures in Wonderland',
							}}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider>
						<TextInput
							label='Заметка'
							error={errors.note?.message}
							dataTestId={ChangeBookFormTest.noteField.id}
							inputProps={{
								...register('note', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
							}}
						/>
					</InputFieldsOverrider>
					<FormError text={formError} dataTestId={ChangeBookFormTest.failMessage.id} />
				</FormFieldsWrapper>
			</BookFormSurface>
		</form>
	)
}
