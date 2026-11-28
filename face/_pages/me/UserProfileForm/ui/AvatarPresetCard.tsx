import { useTranslations } from 'next-intl'
import AvatarImage from '@/entities/user/ui/AvatarImage'
import type { AvatarPresetModel, UserGender } from '@/entities/user/UserService'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'

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
		<BaseButton
			type='button'
			theme='unstyled'
			extraClass='avatar-preset-picker__preset'
			aria-pressed={selected}
			aria-label={label}
			disabled={disabled}
			onClick={function () {
				if (!selected || gender !== preset.gender) onSelect()
			}}
		>
			<span className='avatar-preset-picker__image'>
				<AvatarImage url={preset.avatarUrl} alt='' />
			</span>
			<span className='avatar-preset-picker__caption'>{label}</span>
		</BaseButton>
	)
}

export default AvatarPresetCard
