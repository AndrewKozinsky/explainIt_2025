'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import LoadingMessage from '@/shared/ui/LoadingMessage/LoadingMessage'
import SeparatedStack from '@/shared/ui/SeparatedStack/SeparatedStack'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import AiDialogueInput from '@/widgets/aiDialogueForm/AiDialogueForm/AiDialogueInput'
import AiDialogueMessageList from '@/widgets/aiDialogueMessages/ui/AiDialogueMessageList/AiDialogueMessageList'
import { DialogueAudioProvider } from '@/widgets/aiDialogueMessages/ui/audio/DialogueAudioContext'
import { PhraseDictionary } from '@/widgets/dictionary'
import { resolveAiDialogueTurnError } from '_pages/aiDialogue/AiDialoguePage/fn/resolveTurnError'
import { useAiDialogueStream } from '_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueStream'
import AiDialogueLeftWrapper from '../AiDialogueLeftWrapper/AiDialogueLeftWrapper'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { useAiDialogueAudio } from './fn/useAiDialogueAudio'
import { useAiDialogueVisuals } from './fn/useAiDialogueVisuals'
import { useAiDialogueWordSelection } from './fn/useAiDialogueWordSelection'

type Props = {
	dialogueId: string
}

export default function AiDialoguePage({ dialogueId }: Props) {
	const locale = useLocale()
	const [showText, setShowText] = useState(false)

	const { data: dialogue, error, isPending } = useQuery(aiDialogueQueries.getDialogue(Number(dialogueId)))

	const { visuals, refreshVisuals, recoverImage } = useAiDialogueVisuals(Number(dialogueId), Boolean(dialogue))
	const audio = useAiDialogueAudio(Number(dialogueId), Boolean(dialogue))
	const { messages, preview, isGenerating, turnError } = useAiDialogueStream(
		Number(dialogueId),
		Boolean(dialogue),
		refreshVisuals,
		audio.handlers,
	)

	const { selectedWord, selectedSentence, handleWordSelect } = useAiDialogueWordSelection(dialogueId)

	if (error) {
		return <ErrorMessage text={error.message} />
	}

	if (isPending || !dialogue) {
		return <LoadingMessage text='Загрузка диалога…' />
	}

	const { header } = getHeaderAndSubHeader(dialogue, locale)

	return (
		<DialogueAudioProvider player={audio.player} state={audio.state}>
			<MediaRoot
				breadCrumbsConfig={[pageUrls.aiDialogues]}
				header={header}
				leftBlock={
					<AiDialogueLeftWrapper>
						<>
							{audio.state.blocked && (
								<button
									type='button'
									className='dialogue-audio-unlock'
									onClick={function () {
										audio.player.unlock()
									}}
								>
									Включить звук
								</button>
							)}
							{turnError && <ErrorMessage text={resolveAiDialogueTurnError(turnError)} />}
							<AiDialogueMessageList
								key={dialogueId}
								messages={messages}
								preview={preview}
								isGenerating={isGenerating}
								onWordSelect={handleWordSelect}
								visuals={visuals}
								refreshVisuals={refreshVisuals}
								recoverImage={recoverImage}
							/>
						</>
						<AiDialogueInput dialogueId={Number(dialogueId)} />
					</AiDialogueLeftWrapper>
				}
				rightBlock={
					<ViewportSyncedHeight gapTop={10} gapBottom={10}>
						<SeparatedStack>
							<DetailsBlock
								tabs={[
									{
										type: 'dictionary',
										text: 'Словарь',
										content: (
											<PhraseDictionary
												languageCode={dialogue.sourceLanguageCode}
												currentWord={selectedWord ?? undefined}
											/>
										),
									},
									{ type: 'ai_dialog', text: 'Диалог', content: <p>{selectedSentence}</p> },
								]}
							/>
							<p>123456789001</p>
						</SeparatedStack>
					</ViewportSyncedHeight>
				}
			/>
		</DialogueAudioProvider>
	)
}
