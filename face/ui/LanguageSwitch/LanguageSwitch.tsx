import React from 'react'
import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import './LanguageSwitch.scss'

type LanguageSwitchProps = {
	languages: LanguageCode[]
	currentLang: LanguageCode
	onChange: (lang: LanguageCode) => void
	className?: string
}

function LanguageSwitch(props: LanguageSwitchProps) {
	const { languages, currentLang, onChange, className } = props

	return (
		<div className={cn('language-switch', className)}>
			{languages.map((lang) => {
				return (
					<button
						className={cn(
							'language-switch__button',
							lang === currentLang
								? 'language-switch__button--current'
								: 'language-switch__button--active',
						)}
						onClick={() => onChange(lang)}
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
