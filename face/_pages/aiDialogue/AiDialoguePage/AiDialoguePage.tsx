'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import DetailsBlock, { type InfoViewType } from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import { useIsBalanceExhausted } from '@/entities/user/fn/useIsBalanceExhausted'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import LoadingMessage from '@/shared/ui/LoadingMessage/LoadingMessage'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import AiDialogueInput from '@/widgets/aiDialogueForm/AiDialogueForm/AiDialogueInput'
import type { AiDialogueWordSelection } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueMessageList from '@/widgets/aiDialogueMessages/ui/AiDialogueMessageList/AiDialogueMessageList'
import AiDialogueMessageReview from '@/widgets/aiDialogueMessages/ui/AiDialogueMessageReview/AiDialogueMessageReview'
import { DialogueAudioProvider } from '@/widgets/aiDialogueMessages/ui/audio/DialogueAudioContext'
import AiDialogueSettings from '@/widgets/aiDialogueSettings/ui/AiDialogueSettings/AiDialogueSettings'
import { PhraseDictionary } from '@/widgets/dictionary'
import { resolveAiDialogueTurnError } from '_pages/aiDialogue/AiDialoguePage/fn/resolveTurnError'
import { useAiDialogueStream } from '_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueStream'
import AiDialogueLeftWrapper from '../AiDialogueLeftWrapper/AiDialogueLeftWrapper'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { useAiDialogueAudio } from './fn/useAiDialogueAudio'
import { useAiDialogueSendMessage } from './fn/useAiDialogueSendMessage'
import { useAiDialogueTextLevel } from './fn/useAiDialogueTextLevel'
import { useAiDialogueVisuals } from './fn/useAiDialogueVisuals'
import { useAiDialogueWordSelection } from './fn/useAiDialogueWordSelection'

type Props = {
	dialogueId: string
}

export default function AiDialoguePage({ dialogueId }: Props) {
	const t = useTranslations('pageUrls')
	const tPage = useTranslations('aiDialoguePage')
	const locale = useLocale()
	const { data: dialogue, error, isPending } = useQuery(aiDialogueQueries.getDialogue(Number(dialogueId)))
	const { textLevel, changeTextLevel, isUpdatingTextLevel } = useAiDialogueTextLevel(Number(dialogueId), dialogue)

	const { visuals, refreshVisuals, recoverImage } = useAiDialogueVisuals(Number(dialogueId), Boolean(dialogue))
	const audio = useAiDialogueAudio(Number(dialogueId))
	const { messages, preview, isGenerating, turnError } = useAiDialogueStream(
		Number(dialogueId),
		Boolean(dialogue),
		refreshVisuals,
		audio.handlers,
	)

	const { selectedWord, handleWordSelect } = useAiDialogueWordSelection(dialogueId)
	const [detailsView, setDetailsView] = useState<InfoViewType>('dictionary')
	const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null)
	const send = useAiDialogueSendMessage(Number(dialogueId))
	const isBalanceExhausted = useIsBalanceExhausted()

	if (error) {
		return <ErrorMessage text={error.message} />
	}

	if (isPending || !dialogue) {
		return <LoadingMessage text={tPage('loading')} />
	}

	const { header } = getHeaderAndSubHeader(dialogue)
	const selectedPayload = messages.find((message) => message.id === selectedMessageId)?.payload

	function selectMessage(messageId: number) {
		setSelectedMessageId(messageId)
		setDetailsView('message')
	}

	function changeDetailsView(view: InfoViewType) {
		setSelectedMessageId(null)
		setDetailsView(view)
	}

	function selectWord(selection: AiDialogueWordSelection) {
		handleWordSelect(selection)
		changeDetailsView('dictionary')
	}

	return (
		<DialogueAudioProvider player={audio.player} state={audio.state}>
			<MediaRoot
				breadCrumbsConfig={[{ name: t(pageUrls.aiDialogues.nameKey), path: pageUrls.aiDialogues.path }]}
				header={header}
				leftBlock={
					<AiDialogueLeftWrapper>
						<>
							{turnError && <ErrorMessage text={resolveAiDialogueTurnError(turnError, locale)} />}
							<AiDialogueMessageList
								key={dialogueId}
								messages={messages}
								preview={preview}
								isGenerating={isGenerating}
								onWordSelect={selectWord}
								onMessageSelect={selectMessage}
								selectedMessageId={selectedMessageId}
								reviewOpen={detailsView === 'message'}
								visuals={visuals}
								refreshVisuals={refreshVisuals}
								recoverImage={recoverImage}
							/>
						</>
						<AiDialogueInput
							dialogueId={Number(dialogueId)}
							sourceLanguageCode={dialogue.sourceLanguageCode}
							send={send}
							balanceExhausted={isBalanceExhausted}
						/>
					</AiDialogueLeftWrapper>
				}
				rightBlock={
					<ViewportSyncedHeight gapTop={10} gapBottom={10}>
						<DetailsBlock
							key={selectedMessageId}
							activeView={detailsView}
							onViewChange={changeDetailsView}
							tabs={[
								{
									type: 'dictionary',
									text: tPage('tabs.dictionary'),
									content: (
										<PhraseDictionary
											languageCode={dialogue.sourceLanguageCode}
											currentWord={selectedWord ?? undefined}
										/>
									),
								},
								{
									type: 'message',
									text: tPage('tabs.message'),
									content: (
										<AiDialogueMessageReview
											message={selectedPayload?.type === 'userActions' ? selectedPayload : null}
										/>
									),
								},
								{
									type: 'settings',
									text: tPage('tabs.settings'),
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
							]}
						/>
					</ViewportSyncedHeight>
				}
			/>
		</DialogueAudioProvider>
	)
}
