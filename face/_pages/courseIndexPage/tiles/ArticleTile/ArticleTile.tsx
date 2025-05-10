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
		<Link href={tile.url} className='article-tile'>
			{tile.top && (
				<p className='article-tile__top' data-testid='article-tile__top'>
					{tile.top}
				</p>
			)}
			<h3 className='article-tile__header' data-testid='article-tile__header'>
				{tile.header}
			</h3>
			<p className='article-tile__description' data-testid='article-tile__description'>
				{tile.description}
			</p>
		</Link>
	)
}
