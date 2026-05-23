import React from 'react'

// This is a placeholder. In the future, this data would be fetched from an API.
const getArticleContent = (id: string) => {
	return `This is the content for article ${id}.`
}

export default function ExpressionPage({ params }: { params: { articleId?: string; articleSlug?: string } }) {
	const id = params.articleId
	const articleContent = getArticleContent(id!)

	return (
		<div>
			<h1>Article {id}</h1>
			<p>{articleContent}</p>
		</div>
	)
}
