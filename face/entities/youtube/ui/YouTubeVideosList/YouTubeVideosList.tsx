'use client'

import React from 'react'
import MediaCardButton from '@/entities/media/ui/MediaCard/MediaCardButton'
import { videoConfig } from '@/entities/video/lib/videoConfig'
import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'

export type YouTubeVideoCardData = {
	id: number | string
	name: string | null
	subName?: string | null
	proficiencyLevel?: string | null
	duration: string | null
	coverUrl: string | null
	url: string
}

type YouTubeVideosListProps = {
	items: YouTubeVideoCardData[]
}

function YouTubeVideosList(props: YouTubeVideosListProps) {
	const { items } = props

	return (
		<ItemsGrid>
			{items.map(function (item) {
				return (
					<MediaCardButton
						key={item.id}
						name={item.name}
						subName={item.subName}
						proficiencyLevel={item.proficiencyLevel}
						duration={item.duration}
						coverUrl={item.coverUrl}
						url={item.url}
						defaultMediaName={videoConfig.newVideoEmptyName}
					/>
				)
			})}
		</ItemsGrid>
	)
}

export default YouTubeVideosList
