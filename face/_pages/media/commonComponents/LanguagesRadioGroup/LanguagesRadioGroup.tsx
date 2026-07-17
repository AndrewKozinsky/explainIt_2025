'use client'

import React, { useMemo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { LanguagesApi } from '@/entites/languages/repository/LanguagesApi'
import { useFetchData } from '@/shared/hooks/useFetchData'
import RadioGroup from '@/shared/ui/formRelated/RadioGroup/RadioGroup'

type LanguagesRadioGroupProps = {
	value?: string
	disabled?: boolean
	inputProps: UseFormRegisterReturn<'languageCode'>
}

function LanguagesRadioGroup(props: LanguagesRadioGroupProps) {
	const { value, disabled, inputProps } = props
	const { ref, ...restInputProps } = inputProps

	const api = useMemo(() => new LanguagesApi(), [])
	const { data: languages } = useFetchData(() => api.getLanguages(), [api])

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
