'use client'

import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import AiDialoguePagePartsWrapper from '@/entities/aiDialogue/ui/AiDialoguePagePartsWrapper/AiDialoguePagePartsWrapper'
import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import LoadingMessage from '@/shared/ui/LoadingMessage/LoadingMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import AiDialogueInput from '@/widgets/aiDialogueForm/AiDialogueForm/AiDialogueInput'
import type { AiDialogueWordSelection } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueMessageList from '@/widgets/aiDialogueMessages/ui/AiDialogueMessageList/AiDialogueMessageList'
import { PhraseDictionary } from '@/widgets/dictionary'
import { resolveAiDialogueTurnError } from '_pages/aiDialogue/AiDialoguePage/fn/resolveTurnError'
import { useAiDialogueStream } from '_pages/aiDialogue/AiDialoguePage/fn/useAiDialogueStream'
import AiDialogueLeftWrapper from '../AiDialogueLeftWrapper/AiDialogueLeftWrapper'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'

type Props = {
	dialogueId: string
}

export default function AiDialoguePage({ dialogueId }: Props) {
	const locale = useLocale()

	const { data: dialogue, error, isPending } = useQuery(aiDialogueQueries.getDialogue(Number(dialogueId)))

	const { messages, preview, isGenerating, turnError } = useAiDialogueStream(Number(dialogueId), Boolean(dialogue))

	const [selectedWord, setSelectedWord] = useState<null | string>(null)
	const [selectedSentence, setSelectedSentence] = useState('')

	const handleWordSelect = useCallback(function ({ word, sentence }: AiDialogueWordSelection) {
		setSelectedWord(word)
		setSelectedSentence(sentence)
	}, [])

	if (error) {
		return <ErrorMessage text={error.message} />
	}

	if (isPending || !dialogue) {
		return <LoadingMessage text='Загрузка диалога…' />
	}

	const { header } = getHeaderAndSubHeader(dialogue, locale)

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[pageUrls.aiDialogues]} />} header={header}>
			<AiDialoguePagePartsWrapper>
				<AiDialogueLeftWrapper>
					<>
						{turnError && <ErrorMessage text={resolveAiDialogueTurnError(turnError)} />}
						<AiDialogueMessageList
							messages={messages}
							preview={preview}
							isGenerating={isGenerating}
							onWordSelect={handleWordSelect}
						/>
					</>
					<AiDialogueInput dialogueId={Number(dialogueId)} />
				</AiDialogueLeftWrapper>
				<ViewportSyncedHeight gapTop={10} gapBottom={10}>
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
				</ViewportSyncedHeight>
			</AiDialoguePagePartsWrapper>
		</MediaPageContentWrapper>
	)
}
