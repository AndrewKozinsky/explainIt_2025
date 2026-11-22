'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { aiDialogueQueries } from '@/entities/aiDialogue/AiDialogueQueryFacade'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import LoadingMessage from '@/shared/ui/LoadingMessage/LoadingMessage'
import LoadedAiDialoguePage from './LoadedAiDialoguePage'

type Props = {
	dialogueId: string
}

export default function AiDialoguePage({ dialogueId }: Props) {
	const tPage = useTranslations('aiDialoguePage')
	const { data: dialogue, error, isPending } = useQuery(aiDialogueQueries.getDialogue(Number(dialogueId)))

	if (error) {
		return <ErrorMessage text={error.message} />
	}

	if (isPending || !dialogue) {
		return <LoadingMessage text={tPage('loading')} />
	}

	return <LoadedAiDialoguePage key={dialogueId} dialogueId={dialogueId} dialogue={dialogue} />
}
