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
import DeleteVideoButton from '../DeleteVideoButton/DeleteVideoButton'
import FileNameAndDeleteFileButton from '../FileNameAndDeleteFileButton/FileNameAndDeleteFileButton'
import GenerateSubtitlesButton from '../GenerateSubtitlesButton/GenerateSubtitlesButton'
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
		control,
		formState: { errors, isDirty },
		setError,
		setValue,
	} = useForm<ChangeVideoFormData>({
		resolver: yupResolver(changeVideoFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(reset, setValue)

	const onSubmit = useGetOnUpdateVideoFormSubmit(setError, setFormStatus, setFormError)
	const isFormDisabled = ['success', 'submitting'].includes(formStatus)

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
					<WatchMovieButton key='watch' disabled={isFormDisabled} />,
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
						label='Название'
						error={errors.name?.message}
						inputProps={{
							...register('name'),
							disabled: isFormDisabled,
							placeholder: 'Terminator 2',
						}}
					/>
					<FileNameAndDeleteFileButton />
					<VideoDropzone />
					<TextInput
						label='Субтитры или текст'
						error={errors.content?.message}
						textareaProps={{
							...register('content'),
							disabled: isFormDisabled,
							rows: 10,
							placeholder: `1
00:01:50,152 --> 00:01:52,238
Three billion human lives ended

2
00:01:52,446 --> 00:01:54,865
on August 29, 1997.

3
00:01:56,033 --> 00:02:00,913
The survivors of the nuclear fire called the war Judgment Day.`,
						}}
					/>
					<FormError text={formError} />
					<GenerateSubtitlesButton disabled={isFormDisabled} />
				</FormFieldsWrapper>
			</MediaFormSurface>
		</form>
	)
}
