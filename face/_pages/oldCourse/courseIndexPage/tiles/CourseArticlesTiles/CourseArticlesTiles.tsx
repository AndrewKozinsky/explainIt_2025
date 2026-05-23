import { TilesWrapper } from '../../TilesWrapper/TilesWrapper'
import ArticleTile from '../ArticleTile/ArticleTile'
import { getTilesData } from './fn/getTilesData'

export function CourseArticlesTiles() {
	const tilesArr = getTilesData()

	return (
		<TilesWrapper>
			{tilesArr.map((tile) => {
				const url = tile.url

				return <ArticleTile tile={tile} key={url} />
			})}
		</TilesWrapper>
	)
}
