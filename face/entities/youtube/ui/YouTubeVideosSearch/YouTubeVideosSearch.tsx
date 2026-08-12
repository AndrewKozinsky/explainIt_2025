'use client'

import React, { useState } from 'react'
import YouTubeSearch from '@/entities/youtube/ui/YouTubeSearch/YouTubeSearch'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import YouTubeVideosCenterWrapper from '@/widgets/video/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
import YouTubeVideosList from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'
import { useYouTubeVideos } from '_pages/media/youTubeVideos/YouTubeVideosPage/fn/setupYouTubeDeps'
import './YouTubeVideosSearch.scss'

function YouTubeVideosSearch() {
	const [query, setQuery] = useState('')

	const { loading, videos, error, hasMore, hasSearched, search, loadMore } = useYouTubeVideos(query)

	return (
		<div className='youtube-videos-search'>
			<YouTubeSearch query={query} onQueryChange={setQuery} onSearch={search} loading={loading} />
			<YouTubeVideosList items={videos} loading={loading} error={error} />
			{!loading && hasMore && (
				<YouTubeVideosCenterWrapper>
					<Button onClick={loadMore} disabled={loading} loading={loading}>
						Загрузить ещё
					</Button>
				</YouTubeVideosCenterWrapper>
			)}
		</div>
	)
}

export default YouTubeVideosSearch
