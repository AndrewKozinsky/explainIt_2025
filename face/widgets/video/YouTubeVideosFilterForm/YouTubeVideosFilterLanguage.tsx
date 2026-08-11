import React from 'react'
import Select, { type DropdownOption } from '@/shared/ui/formRelated/Select/Select'
import { type LanguageCode, languageKeys, languages } from '@/shared/utils/languages'

type YouTubeVideosFilterLanguageProps = {
	languageCode: LanguageCode | undefined
	onChange: (languageCode: LanguageCode | undefined) => void
}

function YouTubeVideosFilterLanguage(props: YouTubeVideosFilterLanguageProps) {
	const { languageCode, onChange } = props

	const options: DropdownOption[] = [
		{ value: '', label: 'Все языки' },
		...languageKeys.map(function (key) {
			return { value: key, label: languages[key].name }
		}),
	]

	return (
		<Select
			label='Язык'
			options={options}
			selectProps={{
				value: languageCode ?? '',
				onChange: function (e) {
					const value = e.target.value
					onChange(value === '' ? undefined : (value as LanguageCode))
				},
			}}
		/>
	)
}

export default YouTubeVideosFilterLanguage
