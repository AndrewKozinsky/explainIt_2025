import React from 'react'
import Word from '../../textSide/common/Word/Word'
import CopyButton from './CopyButton'
import { useGetSelectedItem } from './fn/getSelectedItem'
import TranslateButton from './TranslateButton'
import './DetailsSentence.scss'

function DetailsSentence() {
	const { selectedItem, selectedPlainText, selectedSubtitle } = useGetSelectedItem()
	if (!selectedItem) return null

	return (
		<div className='details-sentence'>
			<div className='details-sentence__sentences'>
				<p className='details-sentence__sentence'>
					{selectedItem.sentenceParts.map((part) => {
						if (part.type === 'word') {
							if (selectedSubtitle) {
								return (
									<Word
										contentType='subtitles'
										sentenceId={selectedSubtitle.sentenceId}
										wordId={part.id}
										wordValue={part.value}
										key={part.id}
									/>
								)
							}

							if (selectedPlainText) {
								return (
									<Word
										contentType='plainText'
										sentenceId={selectedPlainText.sentenceId}
										wordId={part.id}
										wordValue={part.value}
										key={part.id}
									/>
								)
							}
						} else if (part.type === 'punctuation') {
							return <span key={part.id}>{part.value}</span>
						} else if (part.type === 'space') {
							return <span key={part.id}> </span>
						}
					})}
				</p>
				<p className='details-sentence__translation'>{selectedItem.translation}</p>
			</div>
			<div className='details-sentence__buttons'>
				<CopyButton />
				<TranslateButton />
			</div>
		</div>
	)
}

export default DetailsSentence
