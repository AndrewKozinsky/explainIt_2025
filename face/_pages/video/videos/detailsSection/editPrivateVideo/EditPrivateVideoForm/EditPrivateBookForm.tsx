import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '@/ui/formRelated/buttons/Button/Button'
import FormError from '@/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import TextInput from '@/ui/formRelated/TextInput/TextInput'
import { FormStatus } from '@/utils/forms'
import MediaFormSurface from '_pages/bookAndVideoCommon/BookFormSurface/MediaFormSurface'
import DeleteVideoButton from '../DeleteVideoButton/DeleteVideoButton'
import FileNameAndDeleteFileButton from '../FileNameAndDeleteFileButton/FileNameAndDeleteFileButton'
import VideoDropzone from '../VideoDropzone/VideoDropzone'
import WatchMovieButton from '../WatchMovieButton/WatchMovieButton'
import { ChangeVideoFormData, changeVideoFormSchema } from './fn/form'
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
			<MediaFormSurface
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
						label='Субтитры или текст'
						error={errors.content?.message}
						textareaProps={{
							...register('content'),
							disabled: ['success', 'submitting'].includes(formStatus),
							placeholder: 'It tells the story of Alice, a young girl who falls down a rabbit hole…',
							rows: 10,
						}}
					/>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</MediaFormSurface>
		</form>
	)
}
