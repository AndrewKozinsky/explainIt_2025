'use client'

import React, { useMemo, useState } from 'react'
import MediaPageContentWrapper from '@/entites/media/ui/MediaPageContentWrapper/MediaPageContentWrapper'
import { YoutubeApi } from '@/entites/youTubeVideos/repository/YoutubeApi'
import YouTubeSearch from '@/entites/youTubeVideos/ui/YouTubeSearch/YouTubeSearch'
import YouTubeVideosCenterWrapper from '@/entites/youTubeVideos/ui/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
import YouTubeVideosList from '@/entites/youTubeVideos/ui/YouTubeVideosList/YouTubeVideosList'
import { YoutubeService } from '@/entites/youTubeVideos/YoutubeService'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import { BreadCrumbs } from '@/shared/ui/pageRelated/BreadCrumbs/BreadCrumbs'
import Spinner from '@/shared/ui/Spinner/Spinner'
import { pageUrls } from '@/shared/utils/pageUrls'
import { useYouTubeVideos } from '_pages/media/youTubeVideos/YouTubeVideosPage/fn/setupYouTubeDeps'
import './YouTubeVideosPage.scss'

function YouTubeVideosPage() {
	const youtubeService = useMemo(function () {
		return new YoutubeService(new YoutubeApi())
	}, [])

	const [query, setQuery] = useState('')

	const { loading, videos, error, hasMore, hasSearched, search, loadMore } = useYouTubeVideos(youtubeService, query)

	return (
		<MediaPageContentWrapper breadCrumbs={<BreadCrumbs items={[]} />} header={pageUrls.youtube.name}>
			<div className='youtube-videos-page'>
				<YouTubeSearch query={query} onQueryChange={setQuery} onSearch={search} loading={loading} />

				{error && (
					<YouTubeVideosCenterWrapper>
						<ErrorMessage text={error} />
					</YouTubeVideosCenterWrapper>
				)}

				{loading && (
					<YouTubeVideosCenterWrapper>
						<Spinner size='small' />
					</YouTubeVideosCenterWrapper>
				)}

				{!loading && videos.length > 0 && <YouTubeVideosList videos={videos} />}

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
				)}
			</div>
		</MediaPageContentWrapper>
	)
}

export default YouTubeVideosPage
