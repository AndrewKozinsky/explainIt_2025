import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import AvatarImage from './AvatarImage'

type UserAvatarFieldProps = { avatarUrl: string; disabled: boolean; onUploadFile: (file: File) => Promise<void> }

const acceptedPhotoFormats = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }

function UserAvatarField({ avatarUrl, disabled, onUploadFile }: UserAvatarFieldProps) {
	return (
		<div className='user-profile-form__photo-field'>
			<LabelWithField label='Текущий аватар' block>
				<div className='user-profile-form__preview'>
					<AvatarImage url={avatarUrl} alt='Текущий аватар' />
				</div>
			</LabelWithField>
			<FileDropzone
				block
				label='Своя фотография'
				visible
				accept={acceptedPhotoFormats}
				supportedFormatsStr='JPEG, PNG, WebP · до 30 МБ'
				maxSize={30 * 1024 * 1024}
				disabled={disabled}
				onUploadFile={onUploadFile}
			/>
		</div>
	)
}

export default UserAvatarField
