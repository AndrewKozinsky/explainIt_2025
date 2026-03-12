import React from 'react'
import RadioGroup from 'ui/formRelated/RadioGroup/RadioGroup'

function LanguagesRadioGroup() {
	const config = [
		{
			name: 'en',
			label: 'English',
			checked: true,
		},
		{
			name: 'de',
			label: 'Deutsch',
			checked: false,
		},
		{
			name: 'fr',
			label: 'Français',
			checked: false,
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

	return <RadioGroup label='Язык' direction='horizontal' config={config} />
}

export default LanguagesRadioGroup
