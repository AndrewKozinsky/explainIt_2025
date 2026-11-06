import { useTranslations } from 'next-intl'
import type { AvatarPresetModel, UserGender } from '@/entities/user/UserService'
import AvatarImage from './AvatarImage'

type AvatarPresetCardProps = {
	preset: AvatarPresetModel
	selected: boolean
	disabled: boolean
	gender: UserGender
	onSelect: () => void
}

function AvatarPresetCard({ preset, selected, disabled, gender, onSelect }: AvatarPresetCardProps) {
	const t = useTranslations('mePage.avatar')
	const label = t('presetLabel', { gender: preset.gender, number: preset.id.endsWith('1') ? '1' : '2' })

	return (
		<button
			type='button'
			className={`user-profile-form__preset${selected ? ' user-profile-form__preset--selected' : ''}`}
			aria-pressed={selected}
			aria-label={label}
			disabled={disabled}
			onClick={function () {
				if (!selected || gender !== preset.gender) onSelect()
			}}
		>
			<span className='user-profile-form__preset-image'>
				<AvatarImage url={preset.avatarUrl} alt={label} />
			</span>
			<span>{label}</span>
		</button>
	)
}

export default AvatarPresetCard
