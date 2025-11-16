import { useGetSelectedPhrasesConfig } from '_pages/books/reading/analysis/PhraseSwitch/fn/phrasesConfig'
import cn from 'classnames'
import React from 'react'
import { useGetSelectPhrase } from './fn/selectPhrase'
import './PhrasesSwitch.scss'

function PhrasesSwitch() {
	const phrasesConfig = useGetSelectedPhrasesConfig()
	const selectPhrase = useGetSelectPhrase()

	if (!phrasesConfig) return null

	return (
		<div className='phrases-switch'>
			{phrasesConfig.map((phraseConfig) => (
				<button
					className={cn('phrases-switch__item', phraseConfig.isSelected && 'phrases-switch__item--selected')}
					onClick={() => selectPhrase(phraseConfig.phraseId)}
					key={phraseConfig.phraseId}
				>
					{phraseConfig.text}
				</button>
			))}
		</div>
	)
}

export default PhrasesSwitch
