'use client'

import { useContext, useId } from 'react'
import cn from 'classnames'
import { useTranslations } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import FileDropzoneIcon from '@/shared/ui/formRelated/FileDropzone/FileDropzoneIcon'
import { FileDropzoneStatus, useFileDropzone } from '@/shared/ui/formRelated/FileDropzone/fn/useFileDropzone'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'
import { NotificationContext } from '@/shared/ui/Notification/fn/context'
import { userQueries } from '../../UserQueryFacade'
import { useUserProfileMutation } from '../../useUserProfileMutation'
import AvatarImage from '../AvatarImage'
import type { UserModel } from '../../UserService'
import './UserAvatarField.scss'

type UserAvatarFieldProps = { selected?: boolean; disabled?: boolean }
type AvatarAction = { type: 'upload'; file: File } | { type: 'select' } | { type: 'delete' }

const acceptedPhotoFormats = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }

function changeAvatar(action: AvatarAction) {
	if (action.type === 'upload') {
		return userQueries.uploadAvatar().mutationFn(action.file)
	}

	if (action.type === 'delete') {
		return userQueries.deleteAvatar().mutationFn()
	}

	return userQueries.updateMe().mutationFn({ avatarPresetId: null })
}

function UserAvatarField(props: UserAvatarFieldProps) {
	const user = useUser()
	return user && <AvatarField key={user.id} user={user} {...props} />
}

function AvatarField({
	user,
	selected = user.avatarPresetId === null,
	disabled,
}: UserAvatarFieldProps & { user: UserModel }) {
	const t = useTranslations('mePage.avatar')
	const { notify } = useContext(NotificationContext)
	const { mutate, mutateAsync, isPending, variables, isSavingProfile } = useUserProfileMutation(user.id, changeAvatar)
	const isDisabled = disabled || isSavingProfile
	const deleting = isPending && variables?.type === 'delete'
	const photoUrl = user.uploadedAvatarUrl

	function notifyError(error: Error) {
		notify({ type: 'error', message: error.message })
	}

	return (
		<div className={cn('user-avatar-field', photoUrl && selected && 'user-avatar-field--selected')}>
			{photoUrl ? (
				<>
					<BaseButton
						type='button'
						theme='unstyled'
						extraClass='user-avatar-field__select'
						aria-pressed={selected}
						disabled={isDisabled}
						onClick={() => {
							if (!selected) mutate({ type: 'select' }, { onError: notifyError })
						}}
					>
						<span className='user-avatar-field__preview'>
							<AvatarImage url={photoUrl} alt='' />
						</span>
						<span className='user-avatar-field__caption'>{t('ownPhoto')}</span>
					</BaseButton>
					<BaseButton
						type='button'
						theme='unstyled'
						extraClass='user-avatar-field__delete'
						aria-label={t('deleteOwnPhoto')}
						title={t('deleteOwnPhoto')}
						disabled={isDisabled}
						onClick={() => mutate({ type: 'delete' }, { onError: notifyError })}
					>
						<TrashButtonIcon />
					</BaseButton>
					<span className='user-avatar-field__announcement' role='status'>
						{deleting && t('deleting')}
					</span>
				</>
			) : (
				<>
					<AvatarUpload
						disabled={isDisabled}
						onUploadFile={async (file) => {
							await mutateAsync({ type: 'upload', file })
						}}
					/>
					<span className='user-avatar-field__caption'>{t('ownPhoto')}</span>
				</>
			)}
		</div>
	)
}

function AvatarUpload({ disabled, onUploadFile }: { disabled?: boolean; onUploadFile: (file: File) => Promise<void> }) {
	const t = useTranslations('fileDropzone')
	const avatar = useTranslations('mePage.avatar')
	const messageId = useId()
	const { getRootProps, getInputProps, open, inputStatus, errorMessage } = useFileDropzone(
		{
			accept: acceptedPhotoFormats,
			supportedFormatsStr: 'JPEG, PNG, WebP',
			maxSize: 30 * 1024 * 1024,
			disabled,
			noClick: true,
			noKeyboard: true,
			onUploadFile,
		},
		{ notifyOnError: false },
	)
	const uploading = inputStatus === FileDropzoneStatus.FILE_UPLOADING
	const dragging = inputStatus === FileDropzoneStatus.FILE_DRAGGING
	const showError = Boolean(errorMessage) && !uploading && !dragging

	let message = t('chooseFile')
	if (uploading) message = avatar('uploading')
	else if (dragging) message = t('dropFile')
	else if (errorMessage) message = errorMessage

	return (
		<div {...getRootProps({ className: 'user-avatar-field__upload' })}>
			<input {...getInputProps()} disabled={disabled || uploading} aria-hidden />
			<BaseButton
				type='button'
				theme='unstyled'
				extraClass={cn('user-avatar-field__choose', {
					'user-avatar-field__choose--active': dragging || uploading,
					'user-avatar-field__choose--error': showError,
				})}
				aria-label={avatar('uploadOwnPhoto')}
				aria-describedby={showError ? messageId : undefined}
				disabled={disabled || uploading}
				onClick={open}
			>
				<FileDropzoneIcon outline={dragging} error={showError} />
				<span id={messageId}>{message}</span>
			</BaseButton>
			<span className='user-avatar-field__announcement' role='status'>
				{(uploading || showError) && message}
			</span>
		</div>
	)
}

export default UserAvatarField
