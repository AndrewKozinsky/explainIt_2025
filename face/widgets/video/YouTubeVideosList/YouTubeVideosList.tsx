import { videoConfig } from '@/entities/video/lib/videoConfig'
import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import ItemsGrid from '@/shared/ui/media/ItemsGrid/ItemsGrid'
import Spinner from '@/shared/ui/Spinner/Spinner'
import MediaCardButton from '@/widgets/media/MediaCard/MediaCardButton'
import YouTubeVideosCenterWrapper from '../YouTubeVideosCenterWrapper/YouTubeVideosCenterWrapper'

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
	loading: boolean
	error: string | null
}

function YouTubeVideosList(props: YouTubeVideosListProps) {
	const { items, loading, error } = props

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
		<ItemsGrid>
			{items.map(function (item) {
				return (
					<MediaCardButton
						key={item.id}
						title={item.name}
						subTitle={item.subName}
						theme={item.theme}
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
