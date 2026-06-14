import React from 'react'
import './PhraseTranslationExamples.scss'

type PhraseTranslationExampleProps = {
	config: { sentence: string; translate: string }[]
}

function PhraseTranslationExamples(props: PhraseTranslationExampleProps) {
	const { config } = props

	return (
		<div className='phrase-translation-examples'>
			{config.map((obj) => {
				return (
					<div className='phrase-translation-example' key={obj.sentence + obj.translate}>
						<p className='phrase-translation-example__sentence'>{obj.sentence}</p>
						<p className='phrase-translation-example__translate'> {obj.translate}</p>
					</div>
				)
			})}
		</div>
	)
}

export default PhraseTranslationExamples
