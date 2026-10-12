import type { UserGender } from '@/entities/user/UserService'
import RadioGroup from '@/shared/ui/formRelated/RadioGroup/RadioGroup'

type UserGenderFieldProps = { gender: UserGender; disabled: boolean; onChange: (gender: UserGender) => void }

function UserGenderField({ gender, disabled, onChange }: UserGenderFieldProps) {
	const config = [
		{
			label: 'Мужской',
			value: 'MALE',
			checked: gender === 'MALE',
			disabled,
			inputProps: { onChange: () => onChange('MALE') },
		},
		{
			label: 'Женский',
			value: 'FEMALE',
			checked: gender === 'FEMALE',
			disabled,
			inputProps: { onChange: () => onChange('FEMALE') },
		},
	]

	return <RadioGroup label='Пол' name='profile-gender' direction='horizontal' config={config} />
}

export default UserGenderField
