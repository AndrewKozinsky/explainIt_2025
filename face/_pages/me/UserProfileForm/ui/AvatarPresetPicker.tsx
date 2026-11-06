import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import type { AvatarPresetId, AvatarPresetModel, UserModel } from '@/entities/user/UserService'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import AvatarPresetCard from './AvatarPresetCard'

type AvatarPresetPickerProps = {
	children: ReactNode
	user: UserModel
	selectedId: AvatarPresetId | null
	presets: AvatarPresetModel[]
	disabled: boolean
	loading: boolean
	error: boolean
	refreshing: boolean
	onRetry: () => void
	onSelect: (id: AvatarPresetId) => void
}

function AvatarPresetPicker(props: AvatarPresetPickerProps) {
	const { children, user, selectedId, presets, disabled, loading, error, refreshing, onRetry, onSelect } = props
	const t = useTranslations('mePage.avatar')

	function renderPreset(preset: AvatarPresetModel) {
		return (
			<AvatarPresetCard
				key={preset.id}
				preset={preset}
				gender={user.gender}
				selected={selectedId === preset.id}
				disabled={disabled}
				onSelect={() => onSelect(preset.id)}
			/>
		)
	}

	return (
		<LabelWithField label={t('label')} block>
			{loading && <p role='status'>{t('loading')}</p>}
			{error && <CatalogError refreshing={refreshing} onRetry={onRetry} />}
			<div className='user-profile-form__presets'>
				{children}
				{presets.map(renderPreset)}
			</div>
			<p className='user-profile-form__photo-hint'>{t('photoHint')}</p>
		</LabelWithField>
	)
}

function CatalogError({ refreshing, onRetry }: { refreshing: boolean; onRetry: () => void }) {
	const t = useTranslations('mePage.avatar')

	return (
		<div className='user-profile-form__catalog-error'>
			<p>{t('loadError')}</p>
			<BaseButton theme='outline' disabled={refreshing} onClick={onRetry}>
				{t('retry')}
			</BaseButton>
		</div>
	)
}

export default AvatarPresetPicker
