// import React from 'react'
// import ArticleType from '../../../../articlesData/articleType'
// import { useGetArticlesNamesOfLevel } from './fn/useGetArticlesNamesOfLevel'
// import './LevelArticlesNames.scss'

/*type ArticlesNamesProps = {
	level: ArticleType.LangLevel
}*/

/** Список названий статей входящий в уровень */
/*function LevelArticlesNames(props: ArticlesNamesProps) {
	const { level } = props

	const articlesNames = useGetArticlesNamesOfLevel(level)

	return (
		<p className="level-articles-names" data-testid="levelA1-articles-names">
			{articlesNames.map((name, i) => {
				if (name === '*') {
					return (
						<span className="level-articles-names__star" key={i}>
							✦
						</span>
					)
				}

				return name
			})}
		</p>
	)
}*/

// export default LevelArticlesNames
