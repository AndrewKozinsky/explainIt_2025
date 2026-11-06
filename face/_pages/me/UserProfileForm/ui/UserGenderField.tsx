import { useTranslations } from 'next-intl'
import type { UserGender } from '@/entities/user/UserService'
import RadioGroup from '@/shared/ui/formRelated/RadioGroup/RadioGroup'

type UserGenderFieldProps = { gender: UserGender; disabled: boolean; onChange: (gender: UserGender) => void }

function UserGenderField({ gender, disabled, onChange }: UserGenderFieldProps) {
	const t = useTranslations('mePage.gender')
	const config = [
		{
			label: t('male'),
			value: 'MALE',
			checked: gender === 'MALE',
			disabled,
			inputProps: { onChange: () => onChange('MALE') },
		},
		{
			label: t('female'),
			value: 'FEMALE',
			checked: gender === 'FEMALE',
			disabled,
			inputProps: { onChange: () => onChange('FEMALE') },
		},
	]

	return <RadioGroup label={t('label')} name='profile-gender' direction='horizontal' config={config} />
}

export default UserGenderField
