import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import LanguagesRadioGroup from '_pages/media/commonComponents/LanguagesRadioGroup/LanguagesRadioGroup'
import MediaFormSurface from '_pages/media/commonComponents/MediaFormSurface/MediaFormSurface'
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
		control,
		formState: { errors, isDirty },
		setError,
	} = useForm<ChangeBookFormData>({
		resolver: yupResolver(changeBookFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateBookFormSubmit(setError, setFormStatus, setFormError)
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
						<Controller
							name='languageCode'
							control={control}
							render={({ field: { onChange, onBlur, value, name, ref } }) => (
								<LanguagesRadioGroup
									value={value ?? undefined}
									disabled={isFormDisabled}
									inputProps={{
										onChange: async (e: any) => {
											onChange(e)
										},
										onBlur: async () => {
											onBlur()
										},
										name,
										ref,
									}}
								/>
							)}
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
