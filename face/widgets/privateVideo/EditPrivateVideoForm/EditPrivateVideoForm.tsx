import React, { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import MediaFormSurface from '@/entities/media/ui/MediaFormSurface/MediaFormSurface'
import type { VideoLiteModel } from '@/entities/video/repository/VideosRepository'
import { videosService } from '@/entities/video/VideosService'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import FormError from '@/shared/ui/formRelated/FormError/FormError'
import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
import LanguagesRadioGroup from '@/shared/ui/LanguagesRadioGroup/LanguagesRadioGroup'
import { FormStatus } from '@/shared/utils/forms'
import DeleteVideoButton from '../DeleteVideoButton/DeleteVideoButton'
import VideoFileSection from '../EditVideoForm/VideoFileSection'
import GenerateSubtitlesBlock from '../GenerateSubtitlesBlock/GenerateSubtitlesBlock'
import WatchVideoButton from '../WatchMovieButton/WatchMovieButton'
import { EditPrivateVideoFormData, editPrivateVideoFormSchema } from './fn/form'
import { useSetFieldValues } from './fn/setFieldValues'
import { useGetOnUpdateVideoFormSubmit } from './fn/submit'
import VideoCoverSection from './VideoCoverSection'
import './EditPrivateVideoForm.scss'

type EditPrivateVideoFormProps = {
	video: VideoLiteModel
	onVideoUpdated: () => void
	onCoverUpdated: (updatedVideo: VideoLiteModel) => void
	onVideoDeleted: (videoId: number) => void
}

export default function EditPrivateVideoForm(props: EditPrivateVideoFormProps) {
	const { video, onVideoUpdated, onCoverUpdated, onVideoDeleted } = props

	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)
	const [originalContent, setOriginalContent] = useState<string | null | undefined>(undefined)
	const [isLoadingVideo, setIsLoadingVideo] = useState(true)

	// Стабилизируем fileUrl: pre-signed URL перегенерируется сервером при каждом GET,
	// поэтому при перефетче после сохранения формы URL меняется и видео
	// перезагружается. Храним URL в ref и обновляем только при реальной загрузке файла.
	const stableFileUrlRef = useRef(video.fileUrl)
	const stableIsFileUploadedRef = useRef(video.isFileUploaded)

	if (video.isFileUploaded && !stableIsFileUploadedRef.current) {
		// Файл только что загрузили — обновляем URL
		stableFileUrlRef.current = video.fileUrl
		stableIsFileUploadedRef.current = true
	} else if (video.isFileUploaded && stableIsFileUploadedRef.current) {
		// Файл уже был загружен — не трогаем URL
	} else if (!video.isFileUploaded) {
		// Файл удалён
		stableFileUrlRef.current = null
		stableIsFileUploadedRef.current = null
	}

	// Сбрасываем при смене видео
	const prevVideoIdForUrlRef = useRef(video.id)
	if (prevVideoIdForUrlRef.current !== video.id) {
		prevVideoIdForUrlRef.current = video.id
		stableFileUrlRef.current = video.fileUrl
		stableIsFileUploadedRef.current = video.isFileUploaded
	}

	useEffect(
		function () {
			let cancelled = false

			// Сбрасываем originalContent при смене видео,
			// чтобы в форму не попал контент от предыдущего
			setOriginalContent(undefined)

			async function fetchVideo() {
				setIsLoadingVideo(true)
				const result = await videosService.getVideo(video.id)

				if (cancelled) return

				if (result.data) {
					setOriginalContent(result.data.originalContent)
				}

				setIsLoadingVideo(false)
			}

			fetchVideo()

			return function () {
				cancelled = true
			}
		},
		[video.id],
	)

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
		setError,
	} = useForm<EditPrivateVideoFormData>({
		resolver: yupResolver(editPrivateVideoFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(video, originalContent, reset)

	const onSubmit = useGetOnUpdateVideoFormSubmit(
		video.id,
		reset,
		function () {
			// Обновляем originalContent после сохранения
			setOriginalContent(undefined)

			// Заново фетчим данные видео, чтобы обновить originalContent
			videosService.getVideo(video.id).then(function (result) {
				if (result.data) {
					setOriginalContent(result.data.originalContent)
				}
			})

			onVideoUpdated()
		},
		setError,
		setFormStatus,
		setFormError,
	)

	const isFormDisabled = ['success', 'submitting'].includes(formStatus)

	if (isLoadingVideo) {
		return (
			<MediaFormSurface leftBottomButtons={[]} rightBottomButtons={[]}>
				<FormFieldsWrapper gap='big'>
					<div>Загрузка видео...</div>
				</FormFieldsWrapper>
			</MediaFormSurface>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<MediaFormSurface
				leftBottomButtons={[
					<DeleteVideoButton
						key='delete'
						videoId={video.id}
						onVideoDeleted={function () {
							onVideoDeleted(video.id)
						}}
					/>,
				]}
				rightBottomButtons={[
					<Button
						type='submit'
						disabled={isFormDisabled || !isDirty}
						loading={formStatus === 'submitting'}
						key='save'
					>
						Сохранить
					</Button>,
					<WatchVideoButton
						key='watch'
						videoId={video.id}
						hasContent={!!originalContent && !isDirty}
						hasFile={!!stableIsFileUploadedRef.current}
					/>,
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
									onChange: async function (e) {
										onChange(e)
									},
									onBlur: async function () {
										onBlur()
									},
									name,
									ref,
								}}
							/>
						)}
					/>
					<TextInput
						block
						label='Название'
						error={errors.name?.message}
						inputProps={{
							...register('name'),
							disabled: isFormDisabled,
							placeholder: 'Моё видео',
						}}
					/>
					<VideoCoverSection
						coverUrl={video.coverUrl}
						videoId={video.id}
						isCoverFileUploaded={video.isCoverFileUploaded}
						onCoverUpdated={onCoverUpdated}
					/>
					<VideoFileSection
						fileUrl={stableFileUrlRef.current}
						isFileUploaded={stableIsFileUploadedRef.current}
						videoId={video.id}
						onFileUpdated={onVideoUpdated}
					/>
					<LabelWithField label='Субтитры или текст' block>
						<div className='edit-private-video-form__subtitles-container'>
							<TextInput
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
							<GenerateSubtitlesBlock videoId={video.id} isFormDisabled={isFormDisabled} />
						</div>
					</LabelWithField>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</MediaFormSurface>
		</form>
	)
}
