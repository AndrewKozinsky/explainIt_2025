import React from 'react'
import Link from 'next/link'
import { ArticleTileType } from './fn/types'
import './ArticleTile.scss'

type ArticleListItemProps = {
	tile: ArticleTileType.Tile
}

// Карточка-ссылка на статью
function ArticleTile(props: ArticleListItemProps) {
	const { tile } = props

	return <ArticleTileArticle tile={tile} />
}

export default ArticleTile

type ArticleTileArticleProps = { tile: ArticleTileType.ArticleTile }

// Карточка статьи
function ArticleTileArticle(props: ArticleTileArticleProps) {
	const { tile } = props

	return (
		<Link href={tile.url} className='article-tile article-tile--article' data-testid='article-tile--article'>
			{tile.top && (
				<p className='article-tile--article-top' data-testid='article-tile-article-top'>
					{tile.top}
				</p>
			)}
			<h3 className='article-tile--article-header' data-testid='article-tile-article-header'>
				{tile.header}
			</h3>
			<p className='article-tile--article-description' data-testid='article-tile-article-description'>
				{tile.description}
			</p>
		</Link>
	)
}
