import { useState } from 'react'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { dictionaryPhraseForClick } from '../../SegmentedText/fn/wordSelection'
import type { DialogueTextSegment } from '../../SegmentedText/fn/wordSelection'

type Input = AiDialogueTextMappingProps & { content: string; onWordSelect: AiDialogueWordSelectHandler }

export function useDialogueContentSelection({ content, onWordSelect, wordMap }: Input) {
	const [isTranslationVisible, setIsTranslationVisible] = useState(false)

	function handleWordClick(segment: DialogueTextSegment) {
		setIsTranslationVisible(true)
		onWordSelect({ word: dictionaryPhraseForClick(content, segment, wordMap), sentence: content })
	}

	return { isTranslationVisible, handleWordClick }
}
