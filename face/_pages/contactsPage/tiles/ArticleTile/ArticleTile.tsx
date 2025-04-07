// import React from 'react'
// import Link from 'next/link'
// import { LanguageLevelBadge } from '../../../courseArtPage/common/LanguageLevelBadge/LanguageLevelBadge'
// import { ArticleTileType } from './fn/types'
// import './ArticleTile.scss'

/*type ArticleListItemProps = {
	tile: ArticleTileType.Tile
}*/

// Карточка-ссылка на статью
/*function ArticleTile(props: ArticleListItemProps) {
	const { tile } = props

	if (tile.type === 'welcome') {
		return <ArticleTileWelcome tile={tile} />
	} else if (tile.type === 'level') {
		return <ArticleTileLevel tile={tile} />
	} else if (tile.type === 'article') {
		return <ArticleTileArticle tile={tile} />
	} else if (tile.type === 'media') {
		return <ArticleTileMedia tile={tile} />
	}

	return null
}*/

// export default ArticleTile

// type ArticleTileWelcomeProps = { tile: ArticleTileType.WelcomeTile }

// Карточка приветствия на курсе
/*function ArticleTileWelcome(props: ArticleTileWelcomeProps) {
	const { tile } = props

	return (
		<Link
			href={tile.url}
			className="article-tile article-tile--welcome"
			data-testid="article-tile--welcome"
		>
			Добро
			<br />
			пожаловать
			<br />
			на курс!
		</Link>
	)
}*/

// type ArticleTileLevelProps = { tile: ArticleTileType.LevelTile }

// Карточка начала нового уровня языка
/*function ArticleTileLevel(props: ArticleTileLevelProps) {
	const { tile } = props

	return (
		<Link
			href={tile.url}
			className="article-tile article-tile--black article-tile--level"
			data-testid="article-tile--levelA1"
		>
			<LanguageLevelBadge level={tile.level} />
		</Link>
	)
}*/

// type ArticleTileArticleProps = { tile: ArticleTileType.ArticleTile }

// Карточка статьи
/*function ArticleTileArticle(props: ArticleTileArticleProps) {
	const { tile } = props

	return (
		<Link
			href={tile.url}
			className="article-tile article-tile--article"
			data-testid="article-tile--article"
		>
			{tile.top && (
				<p className="article-tile--article-top" data-testid="article-tile-article-top">
					{tile.top}
				</p>
			)}
			<h3 className="article-tile--article-header" data-testid="article-tile-article-header">
				{tile.header}
			</h3>
			<p
				className="article-tile--article-description"
				data-testid="article-tile-article-description"
			>
				{tile.description}
			</p>
		</Link>
	)
}*/

// type ArticleTileMediaProps = { tile: ArticleTileType.MediaTile }

// Карточка с фильмами и книгами
/*function ArticleTileMedia(props: ArticleTileMediaProps) {
	const { tile } = props

	return (
		<Link
			href={tile.url}
			className="article-tile article-tile--black article-tile--media"
			data-testid="article-tile--media"
		>
			<img src="/images/common/Camera.svg" className="article-tile--media-img" alt="Camera" />
			<Pill>Фильмы</Pill>
		</Link>
	)
}*/

/*type PillProps = {
	children: string
}*/

// Пилюля с текстом
/*function Pill(props: PillProps) {
	const { children } = props

	return (
		<p className="article-tile-pill" data-testid="article-tile-pill">
			{children}
		</p>
	)
}*/
