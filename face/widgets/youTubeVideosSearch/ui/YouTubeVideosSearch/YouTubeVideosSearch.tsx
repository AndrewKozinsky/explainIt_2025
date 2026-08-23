'use client'

import YouTubeVideosCenterWrapper from '@/entities/video/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
import YouTubeVideosList from '@/entities/video/YouTubeVideosList/YouTubeVideosList'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import YouTubeSearch from '@/widgets/youTubeVideosSearch/ui/YouTubeSearch/YouTubeSearch'
import YouTubeVideoNameHints from '@/widgets/youTubeVideosSearch/ui/YouTubeVideoNameHints/YouTubeVideoNameHints'
import useYouTubeVideosSearch from './fn/useYouTubeVideosSearch'
import './YouTubeVideosSearch.scss'

function YouTubeVideosSearch() {
	const {
		query,
		loading,
		videos,
		error,
		hasMore,
		hasSearched,
		search,
		loadMore,
		handleQueryChange,
		handleHintSelect,
	} = useYouTubeVideosSearch()

	return (
		<div className='youtube-videos-search'>
			<YouTubeSearch query={query} onQueryChange={handleQueryChange} onSearch={search} loading={loading} />
			<YouTubeVideoNameHints onSelect={handleHintSelect} />
			{hasSearched && <YouTubeVideosList items={videos} loading={loading} error={error} />}
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
