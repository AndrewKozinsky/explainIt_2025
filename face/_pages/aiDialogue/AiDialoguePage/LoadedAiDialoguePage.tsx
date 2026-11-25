'use client'

import { useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import type { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import MediaRoot from '@/entities/media/ui/MediaRoot/MediaRoot'
import { useIsBalanceExhausted } from '@/entities/user/fn/useIsBalanceExhausted'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import AiDialogueExamSubmission from '@/widgets/aiDialogue/aiDialogueExam/AiDialogueExamSubmission'
import { getExamProgress } from '@/widgets/aiDialogue/aiDialogueExam/fn/examProgress'
import { useExamSubmission } from '@/widgets/aiDialogue/aiDialogueExam/fn/useExamSubmission'
import AiDialogueInput from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/AiDialogueInput'
import AiDialogueMessageList from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogueMessageList/AiDialogueMessageList'
import { DialogueAudioProvider } from '@/widgets/aiDialogue/aiDialogueMessages/ui/audio/DialogueAudioContext'
import { DialogueModeContext } from '@/widgets/aiDialogue/aiDialogueMessages/ui/DialogueModeContext'
import AiDialogueLeftWrapper from '@/widgets/AiDialogueLeftWrapper/AiDialogueLeftWrapper'
import { resolveAiDialogueTurnError } from '_pages/aiDialogue/AiDialoguePage/fn/resolveTurnError'
import { useAiDialogueStream } from '_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueStream'
import { useAiDialogueStore } from '../aiDialogueStore'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'
import { useAiDialogueAudio } from './fn/useAiDialogueAudio'
import { useAiDialogueExamTabs } from './fn/useAiDialogueExamTabs'
import { useAiDialoguePracticeTabs } from './fn/useAiDialoguePracticeTabs'
import { useAiDialogueSendMessage } from './fn/useAiDialogueSendMessage'
import { useAiDialogueVisuals } from './fn/useAiDialogueVisuals'

type Props = {
	dialogueId: string
	dialogue: AiDialogueModel
}

export default function LoadedAiDialoguePage({ dialogueId, dialogue }: Props) {
	const t = useTranslations('pageUrls')
	const locale = useLocale()

	const { visuals, refreshVisuals, recoverImage } = useAiDialogueVisuals(Number(dialogueId), Boolean(dialogue))
	const shouldAutoplay = useCallback(
		() => dialogue.mode === 'exam' || useReplySettingsStore.getState().isAutoVoiceEnabled,
		[dialogue.mode],
	)

	const audio = useAiDialogueAudio(Number(dialogueId), shouldAutoplay)
	const { messages, turnError } = useAiDialogueStream(
		Number(dialogueId),
		Boolean(dialogue),
		refreshVisuals,
		audio.handlers,
	)

	const send = useAiDialogueSendMessage(Number(dialogueId))
	const isBalanceExhausted = useIsBalanceExhausted()

	const { pending: isCheckingExam, error: examError, submit: submitExam } = useExamSubmission(Number(dialogueId))
	const isGenerating = useAiDialogueStore((state) => state.isGenerating)
	const examProgress = dialogue.mode === 'exam' ? getExamProgress(messages) : null
	const examFinished = Boolean(examProgress?.result)
	const { header } = getHeaderAndSubHeader(dialogue)

	const examTabs = useAiDialogueExamTabs(dialogue.scenario)

	const {
		tabs: practiceTabs,
		detailsView,
		selectedMessageId,
		selectMessage,
		changeDetailsView,
		selectWord,
	} = useAiDialoguePracticeTabs({ dialogueId, dialogue, messages, audio })

	return (
		<DialogueModeContext.Provider value={dialogue.mode}>
			<DialogueAudioProvider player={audio.player} state={audio.state}>
				<MediaRoot
					breadCrumbsConfig={[{ name: t(pageUrls.aiDialogues.nameKey), path: pageUrls.aiDialogues.path }]}
					header={header}
					leftBlock={
						<AiDialogueLeftWrapper lastMessageId={messages.at(-1)?.id}>
							<>
								{turnError && <ErrorMessage text={resolveAiDialogueTurnError(turnError, locale)} />}
								<AiDialogueMessageList
									key={dialogueId}
									messages={messages}
									languageCode={dialogue.sourceLanguageCode}
									scenarioTitle={dialogue.scenario.title}
									onWordSelect={selectWord}
									onMessageSelect={selectMessage}
									selectedMessageId={selectedMessageId}
									reviewOpen={detailsView === 'message'}
									visuals={visuals}
									refreshVisuals={refreshVisuals}
									recoverImage={recoverImage}
								/>
								{examProgress && !examFinished && (
									<AiDialogueExamSubmission
										remaining={examProgress.remaining}
										generating={isGenerating}
										balanceExhausted={isBalanceExhausted}
										pending={isCheckingExam}
										error={examError}
										onSubmit={submitExam}
									/>
								)}
							</>
							{!examFinished && (
								<AiDialogueInput
									dialogueId={Number(dialogueId)}
									sourceLanguageCode={dialogue.sourceLanguageCode}
									send={send}
									disabled={isCheckingExam}
									balanceExhausted={isBalanceExhausted}
								/>
							)}
						</AiDialogueLeftWrapper>
					}
					rightBlock={
						<ViewportSyncedHeight gapTop={10} gapBottom={10}>
							{dialogue.mode === 'exam' ? (
								<DetailsBlock tabs={examTabs} />
							) : (
								<DetailsBlock
									key={selectedMessageId}
									activeView={detailsView}
									onViewChange={changeDetailsView}
									tabs={practiceTabs}
								/>
							)}
						</ViewportSyncedHeight>
					}
				/>
			</DialogueAudioProvider>
		</DialogueModeContext.Provider>
	)
}
