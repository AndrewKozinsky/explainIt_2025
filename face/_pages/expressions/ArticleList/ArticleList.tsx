import React from 'react'
import Link from 'next/link'
import { pageUrls } from 'сonsts/pageUrls'

// This is a placeholder. In the future, this data would be fetched from an API.
const articles = [
	{ id: '1', title: 'Article 1' },
	{ id: '2', title: 'Article 2' },
	{ id: '3', title: 'Article 3' },
]

function ArticleList() {
	return (
		<div>
			<h2>Articles</h2>
			<ul>
				{articles.map((article) => (
					<li key={article.id}>
						<Link href={`${pageUrls.expressions.path}/${article.id}`}>{article.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ArticleList
