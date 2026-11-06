import { useTranslations } from 'next-intl'
import { FileDropzoneStatus, useFileDropzone } from '@/shared/ui/formRelated/FileDropzone/fn/useFileDropzone'
import AvatarImage from './AvatarImage'

type UserAvatarFieldProps = {
	avatarUrl: string | null
	selected: boolean
	disabled: boolean
	onSelect: () => void
	onUploadFile: (file: File) => Promise<void>
}

const acceptedPhotoFormats = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }

function UserAvatarField({ avatarUrl, selected, disabled, onSelect, onUploadFile }: UserAvatarFieldProps) {
	const t = useTranslations('mePage.avatar')
	const { getRootProps, getInputProps, open, inputStatus } = useFileDropzone({
		accept: acceptedPhotoFormats,
		supportedFormatsStr: 'JPEG, PNG, WebP',
		maxSize: 30 * 1024 * 1024,
		disabled,
		noClick: true,
		noKeyboard: true,
		onUploadFile,
	})

	const uploading = inputStatus === FileDropzoneStatus.FILE_UPLOADING

	function handleClick() {
		if (avatarUrl && !selected) onSelect()
		else open()
	}

	return (
		<div {...getRootProps({ role: 'presentation', className: 'user-profile-form__photo-tile' })}>
			<input {...getInputProps()} disabled={disabled || uploading} aria-label={t('uploadOwnPhoto')} />
			<button
				type='button'
				className={`user-profile-form__preset${selected ? ' user-profile-form__preset--selected' : ''}`}
				aria-pressed={selected}
				aria-label={avatarUrl && !selected ? t('selectOwnPhoto') : t('uploadOwnPhoto')}
				disabled={disabled || uploading}
				onClick={handleClick}
			>
				<span className='user-profile-form__preset-image'>
					{avatarUrl ? (
						<AvatarImage url={avatarUrl} alt={t('ownPhoto')} />
					) : (
						<span className='user-profile-form__upload-icon' aria-hidden>
							+
						</span>
					)}
				</span>
				<span>{uploading ? t('uploading') : t('ownPhoto')}</span>
			</button>
		</div>
	)
}

export default UserAvatarField
