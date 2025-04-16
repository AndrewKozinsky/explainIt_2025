import ArticleBuilder from '../../ArticleBuilder/ArticleBuilder'
import ArticleType from '../../articleTypes/articleType'
import { getStyleTagCss } from './fn/getGridStyle'
import './Grid.scss'

type GridProps = {
	config: ArticleType.Grid
}

function Grid(props: GridProps) {
	const { config } = props
	return (
		<section className='art-grid' id={config.gridId}>
			<style type='text/css'>{getStyleTagCss(config)}</style>
			{config.cells.map((cell, i) => {
				return (
					<div className='art-grid__cell' key={i}>
						<ArticleBuilder articleContent={cell.children} />
					</div>
				)
			})}
		</section>
	)
}

export default Grid
