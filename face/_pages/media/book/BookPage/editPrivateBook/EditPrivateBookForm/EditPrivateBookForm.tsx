import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import MediaFormSurface from '_pages/media/commonComponents/BookFormSurface/MediaFormSurface'
import LanguagesRadioGroup from '_pages/media/commonComponents/LanguagesRadioGroup/LanguagesRadioGroup'
import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
import { ChangeBookFormData, changeBookFormSchema, ChangeBookFormTest } from './fn/form'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateBookFormSubmit } from './fn/submit'

export default function EditBookForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
		setError,
	} = useForm<ChangeBookFormData>({
		resolver: yupResolver(changeBookFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateBookFormSubmit(setError, setFormStatus, setFormError)
	const currentLanguageCode = watch('languageCode')
	const isFormDisabled = ['success', 'submitting'].includes(formStatus)

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} data-testid={ChangeBookFormTest.form.id}>
				<MediaFormSurface
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
						<LanguagesRadioGroup
							value={currentLanguageCode ?? undefined}
							disabled={isFormDisabled}
							inputProps={register('languageCode')}
						/>
						<TextInput
							label='Автор'
							error={errors.author?.message}
							dataTestId={ChangeBookFormTest.authorField.id}
							inputProps={{
								...register('author'),
								disabled: isFormDisabled,
								placeholder: 'Lewis Carroll',
							}}
						/>
						<TextInput
							label='Название'
							error={errors.name?.message}
							dataTestId={ChangeBookFormTest.nameField.id}
							inputProps={{
								...register('name'),
								disabled: isFormDisabled,
								placeholder: 'Adventures in Wonderland',
							}}
						/>
						<TextInput
							label='Заметка'
							error={errors.note?.message}
							dataTestId={ChangeBookFormTest.noteField.id}
							inputProps={{
								...register('note'),
								disabled: isFormDisabled,
								placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
							}}
						/>
						<FormError text={formError} dataTestId={ChangeBookFormTest.failMessage.id} />
					</FormFieldsWrapper>
				</MediaFormSurface>
			</form>
		</>
	)
}
