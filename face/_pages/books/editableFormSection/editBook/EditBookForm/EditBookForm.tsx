import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'
import FormError from '../../../../../ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '../../../../../ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '../../../../../ui/formRelated/TextInput/TextInput'
import { FormStatus } from '../../../../../utils/forms'
import { LoginFormTest } from '../../../../auth/authLogin/AuthLoginForm/fn/form'
import { booksLogic } from '../../../booksLogic'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import InputFieldsOverrider from '../../common/InputFieldsOverrider/InputFieldsOverrider'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
import { ChangeBookFormData, changeBookFormSchema, ChangeBookFormTest } from './fn/form'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateBookFormSubmit } from './fn/submit'

export default function EditBookForm() {
	const book = booksLogic.useGetCurrentBook()
	const currentChapterId = booksLogic.useGetCurrentChapterIdFromUrl()

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

	const onSubmit = useGetOnUpdateBookFormSubmit(book?.id, setError, setFormStatus, setFormError)

	if (!book || currentChapterId) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid={LoginFormTest.form.id}>
			<BookFormSurface
				leftBottomButtons={[<DeleteBookButton key='delete' />]}
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
							placeholder='Lewis Carroll'
							error={errors.author?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeBookFormTest.authorField.id}
							{...register('author', { required: false })}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider size='big'>
						<TextInput
							label='Название'
							placeholder={'Alice\'s Adventures in Wonderland'}
							error={errors.name?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeBookFormTest.nameField.id}
							{...register('name', { required: false })}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider>
						<TextInput
							label='Заметка'
							placeholder='It tells the story of Alice, a young girl who falls down a rabbit hole…'
							error={errors.note?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeBookFormTest.noteField.id}
							{...register('note', { required: false })}
						/>
					</InputFieldsOverrider>
					<FormError text={formError} dataTestId={ChangeBookFormTest.failMessage.id} />
				</FormFieldsWrapper>
			</BookFormSurface>
		</form>
	)
}
