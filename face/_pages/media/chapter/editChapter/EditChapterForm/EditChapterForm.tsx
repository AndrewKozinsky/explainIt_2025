import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import MediaFormSurface from '_pages/media/commonComponents/MediaFormSurface/MediaFormSurface'
import DeleteChapterButton from '../DeleteChapterButton/DeleteChapterButton'
import ReadChapterButton from '../ReadChapterButton/ReadChapterButton'
import { ChangeChapterFormData, changeChapterFormSchema } from './fn/form'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateChapterFormSubmit } from './fn/submit'
import YouWillLosePhrasesWarning from './YouWillLosePhrasesWarning'

export default function EditChapterForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setError,
		watch,
	} = useForm<ChangeChapterFormData>({
		resolver: yupResolver(changeChapterFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateChapterFormSubmit(setError, setFormStatus, setFormError)
	const contentText = watch('content')

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MediaFormSurface
					leftBottomButtons={[<DeleteChapterButton key='delete' />]}
					rightBottomButtons={[
						<Button
							type='submit'
							disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
							key='save'
						>
							Сохранить
						</Button>,
						<ReadChapterButton key='reading' />,
					]}
				>
					<FormFieldsWrapper gap='big'>
						<TextInput
							label='Номер'
							error={errors.name?.message}
							inputProps={{
								...register('name'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Chapter 1',
							}}
						/>
						<TextInput
							label='Заголовок'
							error={errors.header?.message}
							inputProps={{
								...register('header'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Down the rabbit-hole…',
							}}
						/>
						<TextInput
							label='Текст'
							error={errors.content?.message}
							textareaProps={{
								...register('content'),
								disabled: ['success', 'submitting'].includes(formStatus),
								placeholder: 'Alice was beginning to get very tired of sitting by her sister...',
								rows: 10,
							}}
							currentText={contentText}
						/>
						<div style={{ width: '100%' }}>
							<YouWillLosePhrasesWarning />
						</div>
						<TextInput
							label='Заметка'
							error={errors.note?.message}
							inputProps={{
								...register('note'),
								disabled: ['success', 'submitting'].includes(formStatus),
							}}
						/>
						<FormError text={formError} />
					</FormFieldsWrapper>
				</MediaFormSurface>
			</form>
		</>
	)
}
