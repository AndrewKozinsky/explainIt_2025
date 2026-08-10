// import React, { useState, useMemo, useEffect } from 'react'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import * as yup from 'yup'
// import { ChaptersService } from '@/entities/chapter/ChaptersService'
// import { ChaptersApi } from '@/entities/chapter/repository/ChaptersApi'
// import type { BookChapterLiteModel } from '@/entities/chapter/repository/ChaptersRepository'
// import MediaFormSurface from '@/entities/media/ui/MediaFormSurface/MediaFormSurface'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import FormError from '@/shared/ui/formRelated/FormError/FormError'
// import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
// import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
// import { FormStatus } from '@/shared/utils/forms'
// import DeleteChapterButton from '../DeleteChapterButton/DeleteChapterButton'
// import ReadChapterButton from '../ReadChapterButton/ReadChapterButton'
// import { ChangeChapterFormData, changeChapterFormSchema } from './fn/form'
// import { useSetFieldValues } from './fn/setFieldValues'
// import { useGetOnUpdateChapterFormSubmit } from './fn/submit'
// import YouWillLosePhrasesWarning from './YouWillLosePhrasesWarning'

/*type EditChapterFormProps = {
	chapterLite: BookChapterLiteModel
	bookId: number
	onChapterUpdated: () => void
	onChapterDeleted: (chapterId: number) => void
}*/

/*export default function EditChapterForm(props: EditChapterFormProps) {
	const { chapterLite, bookId, onChapterUpdated, onChapterDeleted } = props

	const [formStatus, setFormStatus] = useState<FormStatus>('idle')
	const [formError, setFormError] = useState<null | string>(null)
	const [originalContent, setOriginalContent] = useState<string | null>(null)
	const [isLoadingChapter, setIsLoadingChapter] = useState(true)

	const chaptersService = useMemo(() => new ChaptersService(new ChaptersApi()), [])

	useEffect(
		function () {
			let cancelled = false

			async function fetchChapter() {
				setIsLoadingChapter(true)
				const result = await chaptersService.getChapter(chapterLite.id)

				if (cancelled) return

				if (result.data) {
					setOriginalContent(result.data.originalContent)
				}

				setIsLoadingChapter(false)
			}

			fetchChapter()

			return function () {
				cancelled = true
			}
		},
		[chapterLite.id, chaptersService],
	)

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

	useSetFieldValues(chapterLite, originalContent, reset)

	const onSubmit = useGetOnUpdateChapterFormSubmit(
		chapterLite.id,
		reset,
		function () {
			// Обновляем originalContent после сохранения (если изменили контент)
			setOriginalContent(null)

			// Заново фетчим данные главы, чтобы обновить originalContent
			chaptersService.getChapter(chapterLite.id).then(function (result) {
				if (result.data) {
					setOriginalContent(result.data.originalContent)
				}
			})

			onChapterUpdated()
		},
		setError,
		setFormStatus,
		setFormError,
	)

	const contentText = watch('content')
	const isFormDisabled = ['success', 'submitting'].includes(formStatus)

	if (isLoadingChapter) {
		return (
			<MediaFormSurface leftBottomButtons={[]} rightBottomButtons={[]}>
				<FormFieldsWrapper gap='big'>
					<div>Загрузка главы...</div>
				</FormFieldsWrapper>
			</MediaFormSurface>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<MediaFormSurface
				leftBottomButtons={[
					<DeleteChapterButton
						key='delete'
						chapterId={chapterLite.id}
						onChapterDeleted={function () {
							onChapterDeleted(chapterLite.id)
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
					<ReadChapterButton
						key='reading'
						bookId={bookId}
						chapterId={chapterLite.id}
						hasContent={!!originalContent && !isDirty}
					/>,
				]}
			>
				<FormFieldsWrapper gap='big'>
					<TextInput
						label='Номер'
						error={errors.name?.message}
						inputProps={{
							...register('name'),
							disabled: isFormDisabled,
							placeholder: 'Chapter 1',
						}}
					/>
					<TextInput
						label='Заголовок'
						error={errors.header?.message}
						inputProps={{
							...register('header'),
							disabled: isFormDisabled,
							placeholder: 'Down the rabbit-hole…',
						}}
					/>
					<TextInput
						label='Текст'
						error={errors.content?.message}
						textareaProps={{
							...register('content'),
							disabled: isFormDisabled,
							placeholder: 'Alice was beginning to get very tired of sitting by her sister...',
							rows: 10,
						}}
						currentText={contentText}
					/>
					{!!originalContent && (
						<div style={{ width: '100%' }}>
							<YouWillLosePhrasesWarning hasOriginalContent={!!originalContent} />
						</div>
					)}
					<FormError text={formError} />
				</FormFieldsWrapper>
			</MediaFormSurface>
		</form>
	)
}*/
