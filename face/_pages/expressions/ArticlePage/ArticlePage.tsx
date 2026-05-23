import React from 'react'

// This is a placeholder. In the future, this data would be fetched from an API.
const getArticleContent = (id: string) => {
	return `This is the content for article ${id}.`
}

export default function ArticlePage({ params }: { params: { articleId: string } }) {
	const articleContent = getArticleContent(params.articleId)

	return (
		<div>
			<h1>Article {params.articleId}</h1>
			<p>{articleContent}</p>
		</div>
	)
}
