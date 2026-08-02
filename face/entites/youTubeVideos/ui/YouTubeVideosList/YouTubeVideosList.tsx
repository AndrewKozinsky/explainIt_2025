'use client'

import React from 'react'
import MediaCardButton from '@/entites/media/ui/MediaCard/MediaCardButton'
import { videoConfig } from '@/entites/videos/videoConfig'
import { YoutubeVideoModel } from '@/entites/youTubeVideos/repository/YoutubeRepository'
import ItemsGrid from '@/shared/ui/ItemsGrid/ItemsGrid'
import { getConfig } from './fn/getConfig'

type YouTubeVideosListProps = {
	videos: YoutubeVideoModel[]
}

function YouTubeVideosList(props: YouTubeVideosListProps) {
	const { videos } = props

	const config = getConfig(videos)

	return (
		<ItemsGrid>
			{config.map(function (collection) {
				return (
					<MediaCardButton
						name={collection.name}
						subName={collection.subName}
						coverUrl={collection.coverUrl}
						url={collection.url}
						defaultMediaName={videoConfig.newVideoEmptyName}
					/>
				)
			})}
		</ItemsGrid>
	)
}

export default YouTubeVideosList
