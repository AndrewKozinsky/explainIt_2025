import React from 'react'
import cn from 'classnames'
import { LanguageCode } from '@/shared/utils/languages'
import BaseButton from '../formRelated/buttons/BaseButton/BaseButton'
import './LanguageSwitch.scss'

type LanguageSwitchProps = {
	languages: LanguageCode[]
	currentLang: LanguageCode
	onChange: (lang: LanguageCode) => void
	className?: string
	disabled?: boolean
}

function LanguageSwitch(props: LanguageSwitchProps) {
	const { languages, currentLang, onChange, className, disabled } = props

	return (
		<div className={cn('language-switch', className)}>
			{languages.map((lang) => {
				// @ts-ignore
				return (
					<BaseButton
						current={lang === currentLang}
						disabled={disabled}
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
