import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'
import FormError from '../../../../../ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '../../../../../ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '../../../../../ui/formRelated/TextInput/TextInput'
import { FormStatus } from '../../../../../utils/forms'
import { booksLogic } from '../../../booksLogic'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
import { ChangeBookFormData, changeBookFormSchema, ChangeBookFormTest } from './fn/form'

export default function EditBookForm() {
	const book = booksLogic.useGetCurrentBook()
	const currentChapterId = booksLogic.useGetCurrentChapterIdFromUrl()

	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ChangeBookFormData>({
		resolver: yupResolver(changeBookFormSchema),
		defaultValues: {
			author: book?.author || null,
			name: book?.name || null,
			note: book?.note || null,
		},
	})

	if (!book || currentChapterId) return null

	return (
		<BookFormSurface
			leftBottomButtons={[<DeleteBookButton key='delete' />]}
			rightBottomButtons={[
				<Button
					type='submit'
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={ChangeBookFormTest.submitButton.id}
					key='save'
				>
					Сохранить
				</Button>,
			]}
		>
			<FormFieldsWrapper>
				<TextInput
					label='Автор'
					error={errors.author?.message}
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={ChangeBookFormTest.authorField.id}
					{...register('author', { required: false })}
				/>
				<TextInput
					label='Название'
					error={errors.name?.message}
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={ChangeBookFormTest.nameField.id}
					{...register('name', { required: false })}
				/>
				<TextInput
					label='Заметка'
					error={errors.note?.message}
					disabled={['success', 'submitting'].includes(formStatus)}
					dataTestId={ChangeBookFormTest.noteField.id}
					{...register('note', { required: false })}
				/>
				<FormError text={formError} dataTestId={ChangeBookFormTest.failMessage.id} />
			</FormFieldsWrapper>
		</BookFormSurface>
	)
}
