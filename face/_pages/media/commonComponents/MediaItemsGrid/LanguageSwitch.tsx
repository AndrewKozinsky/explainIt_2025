import React from 'react'
import cn from 'classnames'

type LanguageSwitchProps = {
	languagesSet: Set<string>
	currentLang: string
	setCurrentLang: React.Dispatch<React.SetStateAction<string>>
}

function LanguageSwitch(props: LanguageSwitchProps) {
	const { languagesSet, currentLang, setCurrentLang } = props

	return (
		<div className='media-items-grid__languages'>
			{Array.from(languagesSet).map((lang) => {
				return (
					<button
						className={cn(
							'media-items-grid__languages-button',
							lang === currentLang
								? 'media-items-grid__languages-button--current'
								: 'media-items-grid__languages-button--active',
						)}
						onClick={() => setCurrentLang(lang)}
						key={lang}
					>
						{lang}
					</button>
				)
			})}
		</div>
	)
}

export default LanguageSwitch
