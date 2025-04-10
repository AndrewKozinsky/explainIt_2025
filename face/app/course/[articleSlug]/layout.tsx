import { ReactNode } from 'react'
import { Metadata } from 'next'
import articleService from '../../../articleBuilder/articleService/articleService'

/*type GenerateMetadataParams = {
	params: {
		articleSlug: string
	}
}*/

/*export function generateMetadata(params: GenerateMetadataParams): Metadata {
	const { articleSlug } = params.params

	const article = articleService.getArticle(articleSlug)

	if (!article) {
		return {
			description: 'Глава не найдена',
			title: 'Глава не найдена',
		}
	}

	return {
		description: article.meta.articleDescription,
		title: article.meta.articleName,
	}
}*/

type ArticleLayoutProps = {
	children: ReactNode
}

function Layout(props: ArticleLayoutProps) {
	const { children } = props

	return children
}

export default Layout
