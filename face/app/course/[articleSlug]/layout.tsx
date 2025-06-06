import { ReactNode } from 'react'
import { Metadata } from 'next'
import articleService from '../../../articles/articleService/articleService'

type GenerateMetadataParams = {
	params: Promise<{
		articleSlug: string
	}>
}

export async function generateMetadata(params: GenerateMetadataParams): Promise<Metadata> {
	const { articleSlug } = await params.params

	const article = articleService.getArticle(articleSlug)

	if (!article) {
		return {
			description: 'Глава не найдена',
			title: 'Глава не найдена',
		}
	}

	return {
		description: article.meta.description,
		title: article.meta.name,
		keywords: article.meta.keywords,
	}
}

// ==============================

type ArticleLayoutProps = {
	children: ReactNode
}

function Layout(props: ArticleLayoutProps) {
	const { children } = props

	return children
}

export default Layout
