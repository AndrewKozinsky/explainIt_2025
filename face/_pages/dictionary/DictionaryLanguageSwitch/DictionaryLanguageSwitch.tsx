'use client'

import React, { useEffect, useMemo } from 'react'
import { LanguagesService } from '@/entites/languages/LanguagesService'
import { LanguagesApi } from '@/entites/languages/repository/LanguagesApi'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import { useFetchData } from '@/shared/utils/fetchData/useFetchData'
import { LanguageCode } from '@/shared/utils/languages'
import { useDictionaryStore } from '../dictionaryStore'

function DictionaryLanguageSwitch() {
	const service = useMemo(() => new LanguagesService(new LanguagesApi()), [])
	const { data } = useFetchData(() => service.getLanguages(), [service])

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
