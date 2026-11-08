'use client'

import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { useDialogueContentSelection } from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import NoticeMessageWrapper from '../NoticeMessageWrapper/NoticeMessageWrapper'
import HelpBulbIcon from './HelpBulbIcon'

type HelpMessageProps = AiDialogueTextMappingProps & {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

/** Подсказка: по любому слову можно открыть Словарь, после клика показывается перевод подсказки. */
function HelpMessage({ content = '', translation = '', onWordSelect, wordMap }: HelpMessageProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({ content, onWordSelect, wordMap })

	return (
		<NoticeMessageWrapper icon={<HelpBulbIcon />}>
			<AiDialogueTextWithTranslation
				wordMap={wordMap}
				content={content}
				translation={translation}
				isTranslationVisible={isTranslationVisible}
				onWordClick={handleWordClick}
			/>
		</NoticeMessageWrapper>
	)
}

export default HelpMessage
