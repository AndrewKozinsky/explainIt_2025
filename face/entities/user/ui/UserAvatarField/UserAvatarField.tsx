'use client'

import cn from 'classnames'
import { useTranslations } from 'next-intl'
import { useUser } from '@/shared/api/auth/UserProvider'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import FileDropzone from '@/shared/ui/formRelated/FileDropzone/FileDropzone'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'
import AvatarImage from '../AvatarImage'
import { avatarUploadOptions, useUserAvatarField, type UserAvatarFieldOptions } from './fn/useUserAvatarField'
import type { UserModel } from '../../UserService'
import './UserAvatarField.scss'

function UserAvatarField(props: UserAvatarFieldOptions) {
	const user = useUser()
	return user && <AvatarField key={user.id} user={user} {...props} />
}

function AvatarField({ user, ...options }: UserAvatarFieldOptions & { user: UserModel }) {
	const t = useTranslations('mePage.avatar')
	const { photoUrl, selected, isDisabled, deleting, selectPhoto, deletePhoto, uploadPhoto } = useUserAvatarField(
		user,
		options,
	)

	return (
		<div className={cn('user-avatar-field', !photoUrl && 'user-avatar-field--empty')}>
			{photoUrl ? (
				<>
					<BaseButton
						type='button'
						theme='outline'
						extraClass='user-avatar-field__select'
						aria-pressed={selected}
						disabled={isDisabled}
						onClick={selectPhoto}
					>
						<span className='user-avatar-field__preview'>
							<AvatarImage url={photoUrl} alt='' />
						</span>
						<span className='user-avatar-field__caption'>{t('ownPhoto')}</span>
					</BaseButton>
					<BaseButton
						type='button'
						theme='regular'
						extraClass='user-avatar-field__delete'
						aria-label={t('deleteOwnPhoto')}
						title={t('deleteOwnPhoto')}
						disabled={isDisabled}
						onClick={deletePhoto}
					>
						<TrashButtonIcon />
					</BaseButton>
					<span className='user-avatar-field__announcement' role='status'>
						{deleting && t('deleting')}
					</span>
				</>
			) : (
				<>
					<FileDropzone
						{...avatarUploadOptions}
						extraClass='user-avatar-field__dropzone'
						visible
						disabled={isDisabled}
						tracksUploadProgress
						processingMessage={t('processingPhoto')}
						onUploadFile={uploadPhoto}
					/>
					<span className='user-avatar-field__caption'>{t('ownPhoto')}</span>
				</>
			)}
		</div>
	)
}

export default UserAvatarField
