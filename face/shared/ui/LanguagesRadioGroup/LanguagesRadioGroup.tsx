'use client'

import React, { useMemo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { LanguagesService } from '@/entites/languages/LanguagesService'
import { LanguagesApi } from '@/entites/languages/repository/LanguagesApi'
import RadioGroup from '@/shared/ui/formRelated/RadioGroup/RadioGroup'
import { useFetchData } from '@/shared/utils/fetchData/useFetchData'

type LanguagesRadioGroupProps = {
	value?: string
	disabled?: boolean
	inputProps: UseFormRegisterReturn<'languageCode'>
}

function LanguagesRadioGroup(props: LanguagesRadioGroupProps) {
	const { value, disabled, inputProps } = props
	const { ref, ...restInputProps } = inputProps

	const service = useMemo(() => new LanguagesService(new LanguagesApi()), [])
	const { data: languages } = useFetchData(() => service.getLanguages(), [service])

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
