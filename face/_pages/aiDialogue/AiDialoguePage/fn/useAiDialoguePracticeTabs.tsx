import { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import type { DetailsBlockTab } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import { DictionaryButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/DictionaryButtonIcon'
import { InfoButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/InfoButtonIcon'
import { MessageButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/MessageButtonIcon'
import { SettingsButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/SettingsButtonIcon'
import type { DialogueServerMessage } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialogueWordSelection } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueMessageReview from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogueMessageReview/AiDialogueMessageReview'
import AiDialoguePracticeInfo from '@/widgets/aiDialogue/aiDialoguePractice/AiDialoguePracticeInfo'
import AiDialogueSettings from '@/widgets/aiDialogue/aiDialogueSettings/AiDialogueSettings'
import { PhraseDictionary } from '@/widgets/dictionary'
import { useAiDialogueTextLevel } from './useAiDialogueTextLevel'
import { useAiDialogueWordSelection } from './useAiDialogueWordSelection'
import type { useAiDialogueAudio } from './useAiDialogueAudio'

type PracticeTabId = 'dictionary' | 'message' | 'settings' | 'practice'

type useAiDialoguePracticeTabsProps = {
	dialogueId: string
	dialogue: AiDialogueModel
	messages: DialogueServerMessage[]
	audio: Pick<ReturnType<typeof useAiDialogueAudio>, 'player' | 'state'>
}

export function useAiDialoguePracticeTabs({ dialogueId, dialogue, messages, audio }: useAiDialoguePracticeTabsProps) {
	const tPage = useTranslations('aiDialoguePage')
	const { textLevel, changeTextLevel, isUpdatingTextLevel } = useAiDialogueTextLevel(Number(dialogueId), dialogue)

	const { selectedWord, handleWordSelect } = useAiDialogueWordSelection(dialogueId)
	const [detailsView, setDetailsView] = useState<PracticeTabId>('practice')
	const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null)

	const selectMessage = useCallback((messageId: number) => {
		setSelectedMessageId(messageId)
		setDetailsView('message')
	}, [])

	const changeDetailsView = useCallback((view: PracticeTabId) => {
		setSelectedMessageId(null)
		setDetailsView(view)
	}, [])

	const selectWord = useCallback(
		(selection: AiDialogueWordSelection) => {
			handleWordSelect(selection)
			changeDetailsView('dictionary')
		},
		[handleWordSelect, changeDetailsView],
	)

	const selectedPayload = messages.find((message) => message.id === selectedMessageId)?.payload

	const tabs: DetailsBlockTab<PracticeTabId>[] = [
		{
			id: 'practice',
			label: <InfoButtonIcon />,
			ariaLabel: 'О практике',
			content: <AiDialoguePracticeInfo scenario={dialogue.scenario} />,
		},
		{
			id: 'dictionary',
			label: <DictionaryButtonIcon />,
			ariaLabel: tPage('tabs.dictionary'),
			content: (
				<PhraseDictionary languageCode={dialogue.sourceLanguageCode} currentWord={selectedWord ?? undefined} />
			),
		},
		{
			id: 'message',
			label: <MessageButtonIcon />,
			ariaLabel: tPage('tabs.message'),
			content: (
				<AiDialogueMessageReview
					message={selectedPayload?.type === 'userActions' ? selectedPayload : null}
					language={dialogue.sourceLanguageCode}
				/>
			),
		},
		{
			id: 'settings',
			label: <SettingsButtonIcon />,
			ariaLabel: tPage('tabs.settings'),
			content: (
				<AiDialogueSettings
					textLevel={textLevel}
					onTextLevelChange={changeTextLevel}
					isUpdatingTextLevel={isUpdatingTextLevel}
					audioBlocked={audio.state.isBlocked}
					onUnlockAudio={() => audio.player.unlock()}
				/>
			),
		},
	]

	return { tabs, detailsView, selectedMessageId, selectMessage, changeDetailsView, selectWord }
}
