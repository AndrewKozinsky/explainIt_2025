import { getLocale } from 'next-intl/server'
import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import AiDialoguePagePartsWrapper from '@/entities/aiDialogue/ui/AiDialoguePagePartsWrapper/AiDialoguePagePartsWrapper'
import DetailsBlock from '@/entities/detailsBlock/ui/base/DetailsBlock/DetailsBlock'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import ViewportSyncedHeight from '@/shared/ui/ViewportSyncedHeight/ViewportSyncedHeight'
import { pageUrls } from '@/shared/utils/pageUrls'
import { PhraseDictionary } from '@/widgets/dictionary'
import AiDialogueLeftWrapper from '../AiDialogueLeftWrapper/AiDialogueLeftWrapper'
import { getHeaderAndSubHeader } from './fn/getHeaderAndSubHeader'

type Props = {
	dialogueId: string
}

export default async function AiDialoguePage({ dialogueId }: Props) {
	const { error, data: dialogue } = await aiDialogueService.getDialogue(Number(dialogueId))

	if (error) {
		return <ErrorMessage text={error} />
	}

	if (!dialogue) {
		return <ErrorMessage text='Диалог не найден' />
	}

	const locale = await getLocale()
	const { header } = getHeaderAndSubHeader(dialogue, locale)

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[pageUrls.aiDialogues]} />} header={header}>
			<AiDialoguePagePartsWrapper>
				<AiDialogueLeftWrapper>
					<p>messages</p>
					<p>input</p>
				</AiDialogueLeftWrapper>
				<ViewportSyncedHeight gapTop={10} gapBottom={10}>
					<DetailsBlock
						tabs={[
							{
								type: 'dictionary',
								text: 'Словарь',
								content: (
									<PhraseDictionary languageCode={dialogue.sourceLanguageCode} currentWord='hello' />
								),
							},
							{ type: 'ai_dialog', text: 'Диалог', content: <p>selected sentence</p> },
						]}
					/>
				</ViewportSyncedHeight>
			</AiDialoguePagePartsWrapper>
		</MediaPageContentWrapper>
	)
}
