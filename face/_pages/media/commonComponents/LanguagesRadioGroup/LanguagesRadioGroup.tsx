import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import RadioGroup from 'ui/formRelated/RadioGroup/RadioGroup'

type LanguagesRadioGroupProps = {
	value?: string
	disabled?: boolean
	inputProps: UseFormRegisterReturn<'languageCode'>
}

function LanguagesRadioGroup(props: LanguagesRadioGroupProps) {
	const { value, disabled, inputProps } = props

	const config = [
		{
			name: 'en',
			label: 'English',
			checked: value === 'en',
			value: 'en',
			disabled,
			inputProps,
		},
		{
			name: 'de',
			label: 'Deutsch',
			checked: value === 'de',
			value: 'de',
			disabled,
			inputProps,
		},
		{
			name: 'fr',
			label: 'Français',
			checked: value === 'fr',
			value: 'fr',
			disabled,
			inputProps,
		},
	]
	// es
	// it
	// pt
	// ru
	// tr
	// ar
	// zhCMN
	// ko
	// ja

	return <RadioGroup label='Язык' direction='horizontal' config={config} name={inputProps.name} />
}

export default LanguagesRadioGroup
