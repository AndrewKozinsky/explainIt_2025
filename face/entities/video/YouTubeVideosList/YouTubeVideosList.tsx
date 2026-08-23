import MediaCardButton from '@/entities/mediaCard/MediaCard/MediaCardButton'
import MediaCardLongVideo from '@/entities/mediaCard/MediaCardLongVideo/MediaCardLongVideo'
import { videoConfig } from '@/entities/video/lib/videoConfig'
import YouTubeVideosCenterWrapper from '@/entities/video/YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import InfiniteScrollTrigger from '@/shared/ui/InfiniteScrollTrigger/InfiniteScrollTrigger'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import Spinner from '@/shared/ui/Spinner/Spinner'

export type YouTubeVideoCardData = {
	id: number | string
	name: string | null
	subName?: string | null
	theme?: string | null
	proficiencyLevel?: string | null
	duration: string
	durationSeconds: number
	coverUrl: string | null
	url: string
}

type YouTubeVideosListProps = {
	items: YouTubeVideoCardData[]
	loading: boolean
	loadingMore?: boolean
	hasMore?: boolean
	onLoadMore?: () => void
	error: string | null
}

function YouTubeVideosList(props: YouTubeVideosListProps) {
	const { items, loading, loadingMore = false, hasMore = false, onLoadMore, error } = props

	if (loading) {
		return (
			<YouTubeVideosCenterWrapper>
				<Spinner size='small' />
			</YouTubeVideosCenterWrapper>
		)
	}

	if (error) {
		return (
			<YouTubeVideosCenterWrapper>
				<ErrorMessage text={error} />
			</YouTubeVideosCenterWrapper>
		)
	}

	if (items.length === 0) {
		return (
			<YouTubeVideosCenterWrapper>
				<ErrorMessage text='Нет видео по заданным критериям' />
			</YouTubeVideosCenterWrapper>
		)
	}

	return (
		<>
			<ItemsGrid>
				{items.map(function (videoData) {
					if (videoData.durationSeconds > 60 * 60) {
						return (
							<MediaCardLongVideo
								key={videoData.id}
								title={videoData.name}
								duration={videoData.duration}
							/>
						)
					}

					return (
						<MediaCardButton
							key={videoData.id}
							title={videoData.name}
							subTitle={videoData.subName}
							theme={videoData.theme}
							proficiencyLevel={videoData.proficiencyLevel}
							duration={videoData.duration}
							coverUrl={videoData.coverUrl}
							url={videoData.url}
							defaultMediaName={videoConfig.newVideoEmptyName}
						/>
					)
				})}
			</ItemsGrid>
			{onLoadMore ? (
				<InfiniteScrollTrigger
					onTrigger={onLoadMore}
					enabled={hasMore && !loadingMore}
					isLoading={loadingMore}
				/>
			) : null}
		</>
	)
}

export default YouTubeVideosList
