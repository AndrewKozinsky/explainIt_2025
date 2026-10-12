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
			<input {...getInputProps()} disabled={disabled || uploading} aria-label='Загрузить свою фотографию' />
			<button
				type='button'
				className={`user-profile-form__preset${selected ? ' user-profile-form__preset--selected' : ''}`}
				aria-pressed={selected}
				aria-label={avatarUrl && !selected ? 'Выбрать свою фотографию' : 'Загрузить свою фотографию'}
				disabled={disabled || uploading}
				onClick={handleClick}
			>
				<span className='user-profile-form__preset-image'>
					{avatarUrl ? (
						<AvatarImage url={avatarUrl} alt='Своя фотография' />
					) : (
						<span className='user-profile-form__upload-icon' aria-hidden>
							+
						</span>
					)}
				</span>
				<span>{uploading ? 'Загружаем…' : 'Своя фотография'}</span>
			</button>
		</div>
	)
}

export default UserAvatarField
