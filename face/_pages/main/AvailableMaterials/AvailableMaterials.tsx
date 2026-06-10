'use client'

import React, { useState } from 'react'
import LanguageSwitch from 'ui/LanguageSwitch/LanguageSwitch'
import { LanguageCode, languageKeys } from 'utils/languages'
import BooksGrid from '../BooksGrid/BooksGrid'
import './AvailableMaterials.scss'

function AvailableMaterials() {
	const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en')

	return (
		<div className='available-materials'>
			<h2 className='available-materials__header'>Доступные материалы</h2>
			<p className='available-materials__info-text'>Начните прямо сейчас без регистрации</p>
			<div className='available-materials__languages'>
				<LanguageSwitch
					languages={languageKeys}
					currentLang={currentLanguage}
					onChange={(lang) => setCurrentLanguage(lang)}
				/>
			</div>
			<div className='available-materials__books-grid'>
				<BooksGrid currentLanguage={currentLanguage} />
			</div>
		</div>
	)
}

export default AvailableMaterials
