import type { AvatarPresetId, AvatarPresetModel, UserModel } from '@/entities/user/UserService'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import AvatarPresetCard from './AvatarPresetCard'

type AvatarPresetPickerProps = {
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
	const { user, selectedId, presets, disabled, loading, error, refreshing, onRetry, onSelect } = props

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
		<LabelWithField label='Готовые аватары' block>
			{loading && <p role='status'>Загружаем готовые аватары…</p>}
			{error && <CatalogError refreshing={refreshing} onRetry={onRetry} />}
			<div className='user-profile-form__presets'>{presets.map(renderPreset)}</div>
		</LabelWithField>
	)
}

function CatalogError({ refreshing, onRetry }: { refreshing: boolean; onRetry: () => void }) {
	return (
		<div className='user-profile-form__catalog-error'>
			<p>Не удалось загрузить готовые аватары.</p>
			<BaseButton theme='outline' disabled={refreshing} onClick={onRetry}>
				Повторить
			</BaseButton>
		</div>
	)
}

export default AvatarPresetPicker
