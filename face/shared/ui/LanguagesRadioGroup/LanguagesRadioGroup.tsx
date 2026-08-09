'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { UseFormRegisterReturn } from 'react-hook-form'
import { languageQueries } from '@/entities/languages/LanguagesQueryFacade'
import RadioGroup from '@/shared/ui/formRelated/RadioGroup/RadioGroup'

type LanguagesRadioGroupProps = {
	value?: string
	disabled?: boolean
	inputProps: UseFormRegisterReturn<'languageCode'>
}

function LanguagesRadioGroup(props: LanguagesRadioGroupProps) {
	const { value, disabled, inputProps } = props
	const { ref, ...restInputProps } = inputProps

	const { data: languages } = useQuery(languageQueries.getLanguages())

	const config = (languages ?? [])
		.map((lang) => ({
			name: lang.code,
			label: lang.name,
			checked: value === lang.code,
			value: lang.code,
			disabled,
			inputProps: restInputProps,
		}))
		.filter((lang) => lang.name !== 'ru')

	return <RadioGroup label='Язык' direction='horizontal' config={config} name={inputProps.name} />
}

export default LanguagesRadioGroup
