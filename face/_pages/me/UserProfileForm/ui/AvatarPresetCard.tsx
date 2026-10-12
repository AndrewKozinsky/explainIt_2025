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
	const label = `${preset.gender === 'MALE' ? 'Мужской' : 'Женский'} аватар ${preset.id.endsWith('1') ? '1' : '2'}`

	return (
		<label className={`user-profile-form__preset${selected ? ' user-profile-form__preset--selected' : ''}`}>
			<input
				type='radio'
				name='profile-avatar-preset'
				className='user-profile-form__preset-input'
				checked={selected}
				disabled={disabled}
				value={preset.id}
				aria-label={label}
				onChange={onSelect}
				onClick={function () {
					if (selected && gender !== preset.gender) onSelect()
				}}
			/>
			<div className='user-profile-form__preset-image'>
				<AvatarImage url={preset.avatarUrl} alt={label} />
			</div>
			<span className='user-profile-form__preset-label'>{label}</span>
		</label>
	)
}

export default AvatarPresetCard
