import { aiDialogueService } from '@/entities/aiDialogue/AiDialogueService'
import AiDialoguePagePartsWrapper from '@/entities/aiDialogue/ui/AiDialoguePagePartsWrapper/AiDialoguePagePartsWrapper'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import MediaPageContentWrapper from '@/shared/ui/media/MediaPageContentWrapper/MediaPageContentWrapper'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { pageUrls } from '@/shared/utils/pageUrls'
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

	const { header } = getHeaderAndSubHeader(dialogue)

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[pageUrls.aiDialogues]} />} header={header}>
			<AiDialoguePagePartsWrapper>
				<p>left</p>
				<p>right</p>
				{/*<DetailsBlock />*/}
				{/*<PhraseDictionary languageCode='en' words={[]} currentWord='hello' />*/}
			</AiDialoguePagePartsWrapper>
		</MediaPageContentWrapper>
	)
}
