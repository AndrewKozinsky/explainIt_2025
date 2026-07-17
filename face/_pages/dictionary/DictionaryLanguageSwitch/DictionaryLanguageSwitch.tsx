'use client'

import React, { useEffect } from 'react'
import { useLanguageControllerGetLanguages } from '@/shared/api/generated/language/language'
import type { LanguageOutModel } from '@/shared/api/generated/models'
import LanguageSwitch from '@/shared/ui/LanguageSwitch/LanguageSwitch'
import { LanguageCode } from '@/shared/utils/languages'
import { useDictionaryStore } from '../dictionaryStore'

function DictionaryLanguageSwitch() {
	const { data } = useLanguageControllerGetLanguages()
	const currentLang = useDictionaryStore((state) => state.currentLang)
	const setCurrentLang = useDictionaryStore((state) => state.setCurrentLang)

	const languages =
		((data as unknown as LanguageOutModel[])
			?.map((lang) => lang.code)
			.filter((lang) => lang !== 'ru') as LanguageCode[]) ?? ([] as LanguageCode[])

	useEffect(() => {
		if (!currentLang && languages[0]) {
			setCurrentLang(languages[0])
		}
	}, [currentLang, languages, setCurrentLang])

	if (!currentLang) return null

	return <LanguageSwitch languages={languages} currentLang={currentLang} onChange={setCurrentLang} />
}

export default DictionaryLanguageSwitch
