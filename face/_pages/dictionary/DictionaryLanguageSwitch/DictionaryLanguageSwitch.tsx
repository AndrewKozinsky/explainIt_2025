'use client'

import React, { useEffect } from 'react'
import { LanguageCode } from 'utils/utils'
import { useLanguage_Get_Languages } from '@/graphql'
import LanguageSwitch from '@/ui/LanguageSwitch/LanguageSwitch'
import { useDictionaryStore } from '../dictionaryStore'

function DictionaryLanguageSwitch() {
	const { data } = useLanguage_Get_Languages()
	const currentLang = useDictionaryStore((state) => state.currentLang)
	const setCurrentLang = useDictionaryStore((state) => state.setCurrentLang)

	const languages =
		(data?.language_get_languages.map((lang) => lang.code).filter((lang) => lang !== 'ru') as LanguageCode[]) ??
		([] as LanguageCode[])

	useEffect(() => {
		if (!currentLang && languages[0]) {
			setCurrentLang(languages[0])
		}
	}, [currentLang, languages, setCurrentLang])

	if (!currentLang) return null

	return <LanguageSwitch languages={languages} currentLang={currentLang} onChange={setCurrentLang} />
}

export default DictionaryLanguageSwitch
