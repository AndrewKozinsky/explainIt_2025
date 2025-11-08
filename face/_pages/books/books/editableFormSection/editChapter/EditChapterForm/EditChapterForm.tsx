import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import ReadChapterButton from '../ReadChapterButton/ReadChapterButton'
import { ChangeChapterFormData, changeChapterFormSchema, ChangeChapterFormTest } from './fn/form'
import BookFormSurface from '../../common/BookFormSurface/BookFormSurface'
import InputFieldsOverrider from '../../common/InputFieldsOverrider/InputFieldsOverrider'
import DeleteChapterButton from '../DeleteChapterButton/DeleteChapterButton'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateChapterFormSubmit } from './fn/submit'
import ReadChapterNextButton from '../ReadChapterNextButton/ReadChapterNextButton'

export default function EditChapterForm() {
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
					<ReadChapterNextButton key='readingNext' />,
				]}
			>
				<FormFieldsWrapper gap='big'>
					<InputFieldsOverrider>
						<TextInput
							label='Глава'
							error={errors.name?.message}
							dataTestId={ChangeChapterFormTest.nameField.id}
							inputProps={{
								...register('name', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Chapter 1',
							}}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider size='big'>
						<TextInput
							label='Заголовок'
							error={errors.header?.message}
							dataTestId={ChangeChapterFormTest.headerField.id}
							inputProps={{
								...register('header', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Down the rabbit-hole…',
							}}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider>
						<TextInput
							label='Текст'
							error={errors.content?.message}
							dataTestId={ChangeChapterFormTest.contentField.id}
							textareaProps={{
								...register('content', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder:
									'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do',
								rows: 10,
							}}
						/>
					</InputFieldsOverrider>
					<InputFieldsOverrider>
						<TextInput
							label='Заметка'
							error={errors.note?.message}
							dataTestId={ChangeChapterFormTest.noteField.id}
							inputProps={{
								...register('note', { required: false }),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
							}}
						/>
					</InputFieldsOverrider>
					<FormError text={formError} dataTestId={ChangeChapterFormTest.failMessage.id} />
				</FormFieldsWrapper>
			</BookFormSurface>
		</form>
	)
}
