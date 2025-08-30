import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../../ui/formRelated/buttons/Button/Button'
import FormError from '../../../../../ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '../../../../../ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '../../../../../ui/formRelated/TextInput/TextInput'
import { FormStatus } from '../../../../../utils/forms'
import { booksLogic } from '../../../booksLogic'
import ReadChapterButton from '../ReadChapterButton/ReadChapterButton'
import { useFetchCurrentChapterAndSetToStore } from './fn/fetchCurrentChapter'
import { ChangeChapterFormData, changeChapterFormSchema, ChangeChapterFormTest } from './fn/form'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import InputFieldsOverrider from '../../common/InputFieldsOverrider/InputFieldsOverrider'
import DeleteChapterButton from '../DeleteChapterButton/DeleteChapterButton'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateChapterFormSubmit } from './fn/submit'

export default function EditChapterForm() {
	useFetchCurrentChapterAndSetToStore()

	const useGetCurrentChapter = booksLogic.useGetCurrentChapterIdFromUrl()

	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setError,
	} = useForm<ChangeChapterFormData>({
		resolver: yupResolver(changeChapterFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateChapterFormSubmit(setError, setFormStatus, setFormError)

	if (!useGetCurrentChapter) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)} data-testid={ChangeChapterFormTest.form.id}>
			<BookFormSurface
				leftBottomButtons={[<DeleteChapterButton key='delete' />]}
				rightBottomButtons={[
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
						dataTestId={ChangeChapterFormTest.submitButton.id}
						key='save'
					>
						Сохранить
					</Button>,
					<ReadChapterButton key='reading' />,
				]}
			>
				<FormFieldsWrapper gap='big'>
					<InputFieldsOverrider>
						<TextInput
							label='Глава'
							placeholder='Chapter 1'
							error={errors.name?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeChapterFormTest.nameField.id}
							{...register('name', { required: false })}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider size='big'>
						<TextInput
							label='Заголовок'
							placeholder='Down the rabbit-hole…'
							error={errors.header?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeChapterFormTest.headerField.id}
							{...register('header', { required: false })}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider>
						<TextInput
							label='Заметка'
							placeholder='It tells the story of Alice, a young girl who falls down a rabbit hole…'
							error={errors.note?.message}
							disabled={['success', 'submitting'].includes(formStatus)}
							dataTestId={ChangeChapterFormTest.noteField.id}
							{...register('note', { required: false })}
						/>
					</InputFieldsOverrider>
					<FormError text={formError} dataTestId={ChangeChapterFormTest.failMessage.id} />
				</FormFieldsWrapper>
			</BookFormSurface>
		</form>
	)
}
