import React from 'react'
import cn from 'classnames'
import { LanguageCode } from 'utils/utils'
import BaseButton from '../BaseButton/BaseButton'
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
					<BaseButton
						current={lang === currentLang}
						extraClass={cn('language-switch__button')}
						onClick={() => onChange(lang)}
						key={lang}
					>
						{lang}
					</BaseButton>
				)
			})}
		</div>
	)
}

export default LanguageSwitch
