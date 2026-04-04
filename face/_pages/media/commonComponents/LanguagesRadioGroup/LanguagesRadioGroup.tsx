import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import RadioGroup from 'ui/formRelated/RadioGroup/RadioGroup'
import { useLanguage_Get_Languages } from '@/graphql'

type LanguagesRadioGroupProps = {
	value?: string
	disabled?: boolean
	inputProps: UseFormRegisterReturn<'languageCode'>
}

function LanguagesRadioGroup(props: LanguagesRadioGroupProps) {
	const { value, disabled, inputProps } = props

	const { data } = useLanguage_Get_Languages()

	const languages = data?.language_get_languages ?? []

	const config = languages.map((lang) => ({
		name: lang.code,
		label: lang.nameRus,
		checked: value === lang.code,
		value: lang.code,
		disabled,
		inputProps,
	}))

	return <RadioGroup label='Язык' direction='horizontal' config={config} name={inputProps.name} />
}

export default LanguagesRadioGroup
