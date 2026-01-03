import { yupResolver } from '@hookform/resolvers/yup'
import FileNameAndDeleteFileButton from '_pages/video/videos/detailsSection/editPrivateVideo/FileNameAndDeleteFileButton/FileNameAndDeleteFileButton'
import VideoDropzone from '_pages/video/videos/detailsSection/editPrivateVideo/VideoDropzone/VideoDropzone'
import WatchMovieButton from '_pages/video/videos/detailsSection/editPrivateVideo/WatchMovieButton/WatchMovieButton'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import VideoFormSurface from '_pages/video/videos/detailsSection/common/VideoFormSurface/VideoFormSurface'
import DeleteVideoButton from '_pages/video/videos/detailsSection/editPrivateVideo/DeleteVideoButton/DeleteVideoButton'
import { ChangeVideoFormData, changeVideoFormSchema } from './fn/form'
import * as yup from 'yup'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateVideoFormSubmit } from './fn/submit'

export default function EditPrivateVideoForm() {
	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setError,
	} = useForm<ChangeVideoFormData>({
		resolver: yupResolver(changeVideoFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset)

	const onSubmit = useGetOnUpdateVideoFormSubmit(setError, setFormStatus, setFormError)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<VideoFormSurface
				leftBottomButtons={[<DeleteVideoButton key='delete' />]}
				rightBottomButtons={[
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
						loading={formStatus === 'submitting'}
						key='save'
					>
						Сохранить
					</Button>,
					<WatchMovieButton key='watch' />,
				]}
			>
				<FormFieldsWrapper gap='big'>
					<TextInput
						label='Название'
						error={errors.name?.message}
						inputProps={{
							...register('name'),
							disabled: ['success', 'submitting'].includes(formStatus),
							placeholder: 'Adventures in Wonderland',
						}}
					/>
					<FileNameAndDeleteFileButton />
					<VideoDropzone />
					<TextInput
						label='Субтитры'
						error={errors.text?.message}
						inputProps={{
							...register('text'),
							disabled: ['success', 'submitting'].includes(formStatus),
							placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
						}}
					/>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</VideoFormSurface>
		</form>
	)
}
