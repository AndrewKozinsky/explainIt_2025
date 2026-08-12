'use client'

import React, { useMemo, useState } from 'react'
// import { YoutubeApi } from '@/entities/youtube/repository/YoutubeApi'
import YouTubeSearch from '@/entities/youtube/ui/YouTubeSearch/YouTubeSearch'
// import YouTubeVideosCenterWrapper from '@/entities/youtube/ui/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
// import { getConfig } from '@/entities/youtube/ui/YouTubeVideosList/fn/getConfig'
// import YouTubeVideosList from '@/entities/youtube/ui/YouTubeVideosList/YouTubeVideosList'
import { useYouTubeVideos } from '_pages/media/youTubeVideos/YouTubeVideosPage/fn/setupYouTubeDeps'
import './YouTubeVideosSearch.scss'
import YouTubeVideosList from '@/widgets/video/YouTubeVideosList/YouTubeVideosList'

function YouTubeVideosSearch() {
	const [query, setQuery] = useState('')

	const { loading, videos, error, hasMore, hasSearched, search, loadMore } = useYouTubeVideos(query)

	return (
		<div className='youtube-videos-search'>
			<YouTubeSearch query={query} onQueryChange={setQuery} onSearch={search} loading={loading} />
			<YouTubeVideosList items={videos} loading={loading} error={error} />

			{/*{error && (
				<YouTubeVideosCenterWrapper>
					<ErrorMessage text={error} />
				</YouTubeVideosCenterWrapper>
			)}

			{loading && (
				<YouTubeVideosCenterWrapper>
					<Spinner size='small' />
				</YouTubeVideosCenterWrapper>
			)}

			{!loading && videos.length > 0 && <YouTubeVideosList items={getConfig(videos)} />}

			{!loading && hasMore && (
				<YouTubeVideosCenterWrapper>
					<Button onClick={loadMore} disabled={loading} loading={loading}>
						Загрузить ещё
					</Button>
				</YouTubeVideosCenterWrapper>
			)}

			{hasSearched && !loading && !error && videos.length === 0 && (
				<YouTubeVideosCenterWrapper>
					<ErrorMessage text='Видео не найдены.' />
				</YouTubeVideosCenterWrapper>
			)}*/}
		</div>
	)
}

export default YouTubeVideosSearch
