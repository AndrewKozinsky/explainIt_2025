import { NextIntlClientProvider } from 'next-intl'
import { useAiDialogueAudio } from '@/_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueAudio'
import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import messages from '@/messages/ru/aiDialogueMessages.json'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import { DialogueAudioProvider } from '@/widgets/aiDialogueMessages/ui/audio/DialogueAudioContext'
import { DialogueModeContext } from '@/widgets/aiDialogueMessages/ui/DialogueModeContext'

export default function ExamFixture() {
	const audio = useAiDialogueAudio(42)
	return (
		<NextIntlClientProvider locale='ru' messages={{ aiDialogueMessages: messages }}>
			<DialogueModeContext.Provider value='exam'>
				<DetailsBlock tabs={[]} />
				<DialogueAudioProvider player={audio.player} state={audio.state}>
					<AiDialogueContentBlock
						replyTextKey='exam-speech'
						audioAddress={{ messageId: 1, actionIndex: 0 }}
						content='Secret spoken question'
						translation='Секретный перевод'
						onWordSelect={() => {
							throw new Error('Dictionary must not open')
						}}
					/>
					<AiDialogueTextWithTranslation
						content='holds out his hand'
						translation='Протягивает руку'
						isTranslationVisible
						onWordClick={() => {
							throw new Error('Dictionary must not open')
						}}
					/>
				</DialogueAudioProvider>
			</DialogueModeContext.Provider>
		</NextIntlClientProvider>
	)
}
