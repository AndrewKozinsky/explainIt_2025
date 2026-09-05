import { useState } from 'react'
import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import SegmentedText from '../SegmentedText/SegmentedText'
import './AiDialogueContentBlock.scss'

type AiDialogueContentBlockProps = {
	content: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

/**
 * Текстовый блок сообщения: разбитый на слова контент + скрытый перевод.
 *
 * Перевод показывается при клике на слово. Клик также сообщает наверх слово и
 * весь текст блока (для словаря и «выбранного предложения» в правой панели).
 */
function AiDialogueContentBlock({ content, translation, onWordSelect }: AiDialogueContentBlockProps) {
	const [isTranslationVisible, setIsTranslationVisible] = useState(false)

	const handleWordClick = function (word: string) {
		setIsTranslationVisible(true)
		onWordSelect({ word, sentence: content })
	}

	return (
		<div className='ai-dialogue-content-block'>
			<SegmentedText text={content} onWordClick={handleWordClick} />
			{isTranslationVisible && translation ? (
				<div className='ai-dialogue-content-block__translation'>{translation}</div>
			) : null}
		</div>
	)
}

export default AiDialogueContentBlock
