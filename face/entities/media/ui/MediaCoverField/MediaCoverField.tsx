import React, { useCallback, useContext, useState } from 'react'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import DeleteCoverButton from './DeleteCoverButton'
import { coverFormats } from './fn/coverFormats'
import { useStableCoverUrl } from './fn/useStableCoverUrl'
import './MediaCoverField.scss'

export type MediaCoverFieldProps = {
	coverUrl: null | string
	/** Ключ файла в S3 — идентификатор картинки для стабилизации URL */
	coverFileS3Key: null | string
	isCoverFileUploaded: null | boolean
	/** Запросить pre-signed URL для загрузки; null — ошибка */
	onGetUploadUrl: (file: File) => Promise<null | string>
	onUploadComplete: () => Promise<void>
	onDeleteCover: () => Promise<void>
}

function MediaCoverField(props: MediaCoverFieldProps) {
	const { coverUrl, coverFileS3Key, isCoverFileUploaded, onGetUploadUrl, onUploadComplete, onDeleteCover } = props
	const { notify } = useContext(NotificationContext)

	const [isDeleting, setIsDeleting] = useState(false)

	const stableCoverUrl = useStableCoverUrl(coverFileS3Key ?? coverUrl, coverUrl)

	// Превью показываем, только когда картинка действительно доступна:
	// либо это внешняя обложка (нет S3-ключа, например превью YouTube),
	// либо файл уже загружен в S3. Иначе остаётся дропзона со своим прогрессом.
	const isPreviewVisible = Boolean(stableCoverUrl) && (!coverFileS3Key || isCoverFileUploaded === true)

	const handleDelete = useCallback(
		async function () {
			setIsDeleting(true)

			try {
				await onDeleteCover()
			} catch (error) {
				notify({
					type: 'error',
					message:
						'Не удалось удалить обложку. Попробуйте ещё раз или сообщите о проблеме в форме обратной связи.',
				})
			} finally {
				setIsDeleting(false)
			}
		},
		[onDeleteCover, notify],
	)

	if (isPreviewVisible) {
		return (
			<LabelWithField label='Обложка' block>
				<div className='media-cover-field__preview' style={{ backgroundImage: `url(${stableCoverUrl})` }}>
					<DeleteCoverButton isLoading={isDeleting} onDelete={handleDelete} />
				</div>
			</LabelWithField>
		)
	}

	return (
		<FileDropzone
			block
			label='Обложка'
			accept={coverFormats.accept}
			supportedFormatsStr={coverFormats.description}
			visible={true}
			onGetUploadUrl={onGetUploadUrl}
			onUploadComplete={onUploadComplete}
		/>
	)
}

export default React.memo(MediaCoverField)
