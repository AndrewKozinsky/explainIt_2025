'use client'

import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { languageQueries } from '@/entities/languages/LanguagesQueryFacade'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import { LanguageCode } from '@/shared/utils/languages'
import { useDictionaryStore } from '../dictionaryStore'

function DictionaryLanguageSwitch() {
	const { data } = useQuery(languageQueries.getLanguages())

	const currentLang = useDictionaryStore((state) => state.currentLang)
	const setCurrentLang = useDictionaryStore((state) => state.setCurrentLang)

	const languages =
		(data?.map((lang) => lang.code).filter((lang) => lang !== 'ru') as LanguageCode[]) ?? ([] as LanguageCode[])

	useEffect(() => {
		if (!currentLang && languages[0]) {
			setCurrentLang(languages[0])
		}
	}, [currentLang, languages, setCurrentLang])

	if (!currentLang) return null

	return <LanguageSwitch languages={languages} currentLang={currentLang} onChange={setCurrentLang} />
}

export default DictionaryLanguageSwitch
