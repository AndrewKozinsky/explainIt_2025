'use client'

import { cloneElement, useCallback, useState } from 'react'
import MediaNavigation from '@/entites/media/ui/MediaNavigation/MediaNavigation'
import MediaRoot from '@/entites/media/ui/MediaRoot/MediaRoot'
import DetailsBlock from '../DetailsBlock/DetailsBlock'
import type { DetailsBlockMediaMetadata } from '../DetailsBlock/DetailsBlock'

/**
 * Пропсы выделения, которые MediaPageClient пробрасывает в leftBlock.
 * Врапперы принимают их как опциональные — значения будут добавлены
 * через cloneElement при рендеринге на клиенте.
 */
export type SelectionProps = {
	selectedSentenceId?: number | null
	selectedWordId?: number | null
	selectWord?: (input: { sentenceId: number; wordId: number }) => void
}

type MediaPageClientProps = {
	breadCrumbsConfig: { name: string; path: string }[]
	header?: React.ReactNode
	subHeader?: null | string
	leftBlock: React.ReactElement
	mediaNavigation?: React.ComponentProps<typeof MediaNavigation>
	detailsBlockMetadata: DetailsBlockMediaMetadata
}

/**
 * Клиентская прослойка для страниц медиа:
 * 1. Хранит состояние выделения (useState)
 * 2. Пробрасывает selectedSentenceId/WordId/selectWord в leftBlock через cloneElement
 * 3. Передаёт selectedSentenceId/WordId в DetailsBlock напрямую
 *
 * Серверные страницы (ChapterRoot, VideoPage) передают leftBlock как ReactElement
 * (сериализуемый), а MediaPageClient доинжектит selection-пропсы на клиенте.
 */
export function MediaPageClient(props: MediaPageClientProps) {
	const { breadCrumbsConfig, header, subHeader, leftBlock, mediaNavigation, detailsBlockMetadata } = props

	const [selectedSentenceId, setSelectedSentenceId] = useState<number | null>(null)
	const [selectedWordId, setSelectedWordId] = useState<number | null>(null)

	const selectWord = useCallback((input: { sentenceId: number; wordId: number }) => {
		setSelectedSentenceId(input.sentenceId)
		setSelectedWordId(input.wordId)
	}, [])

	const leftBlockWithSelection = cloneElement(leftBlock as React.ReactElement<any>, {
		selectedSentenceId,
		selectedWordId,
		selectWord,
	})

	return (
		<MediaRoot
			breadCrumbsConfig={breadCrumbsConfig}
			header={header}
			subHeader={subHeader}
			leftBlock={leftBlockWithSelection}
			rightBlock={
				<DetailsBlock
					{...detailsBlockMetadata}
					selectedSentenceId={selectedSentenceId ?? null}
					selectedWordId={selectedWordId ?? null}
				/>
			}
			mediaNavigation={mediaNavigation}
		/>
	)
}
