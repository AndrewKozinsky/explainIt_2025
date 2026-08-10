// import React, { useState } from 'react'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { Controller, useForm } from 'react-hook-form'
// import * as yup from 'yup'
// import type { BookModel } from '@/entities/book/repository/BooksRepository'
// import MediaFormSurface from '@/entities/media/ui/MediaFormSurface/MediaFormSurface'
// import Button from '@/shared/ui/formRelated/buttons/Button/Button'
// import FormError from '@/shared/ui/formRelated/FormError/FormError'
// import FormFieldsWrapper from '@/shared/ui/formRelated/FormFieldsWrapper/FormFieldsWrapper'
// import TextInput from '@/shared/ui/formRelated/TextInput/TextInput'
// import LanguagesRadioGroup from '@/shared/ui/LanguagesRadioGroup/LanguagesRadioGroup'
// import { FormStatus } from '@/shared/utils/forms'
// import DeleteBookButton from '../DeleteBookButton/DeleteBookButton'
// import BookCoverSection from './BookCoverSection'
// import { ChangeBookFormData, changeBookFormSchema } from './fn/form'
// import { useSetFieldValues } from './fn/setFieldValues'
// import { useGetOnUpdateBookFormSubmit } from './fn/submit'

/*type EditBookFormProps = {
	book: BookModel
	onBookUpdated: (book: BookModel) => void
	onCoverUpdated: (book: BookModel) => void
}*/

/*export default function EditBookForm(props: EditBookFormProps) {
	const { book, onBookUpdated, onCoverUpdated } = props

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
	} = useForm<ChangeBookFormData>({
		resolver: yupResolver(changeBookFormSchema as yup.AnyObjectSchema),
	})

	useSetFieldValues(book, reset)

	const onSubmit = useGetOnUpdateBookFormSubmit(book, onBookUpdated, setError, setFormStatus, setFormError)
	const isFormDisabled = ['success', 'submitting'].includes(formStatus)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<MediaFormSurface
				leftBottomButtons={[<DeleteBookButton bookId={book.id} key='delete' />]}
				rightBottomButtons={[
					<Button
						type='submit'
						disabled={['success', 'submitting'].includes(formStatus) || !isDirty}
						loading={formStatus === 'submitting'}
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
						inputProps={{
							...register('author'),
							disabled: isFormDisabled,
							placeholder: 'Lewis Carroll',
						}}
					/>
					<TextInput
						label='Название'
						error={errors.name?.message}
						inputProps={{
							...register('name'),
							disabled: isFormDisabled,
							placeholder: 'Adventures in Wonderland',
						}}
					/>
					<BookCoverSection
						coverUrl={book.coverUrl}
						bookId={book.id}
						languageCode={book.languageCode}
						isCoverFileUploaded={book.isCoverFileUploaded}
						onCoverUpdated={onCoverUpdated}
					/>
					<FormError text={formError} />
				</FormFieldsWrapper>
			</MediaFormSurface>
		</form>
	)
}*/
