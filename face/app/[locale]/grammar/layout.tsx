'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'
import { type LanguageCode, languages } from 'utils/languages'
import { pageUrls } from 'utils/pageUrls'

type BreadcrumbItem = {
	name: string
	path: string
}

/** Безопасно получает название языка по коду. */
function getLanguageName(code: string): string {
	return languages[code as LanguageCode]?.name ?? code
}

/** Строит хлебные крошки и заголовок в зависимости от глубины маршрута. */
function useGrammarNavigation() {
	const params = useParams()
	const sourceLanguage = params.sourceLanguage as string | undefined
	const articleSlug = params.articleSlug as string | undefined

	// BreadCrumbs уже содержит корневой элемент (логотип → /),
	// поэтому добавляем только промежуточные звенья.
	const breadcrumbItems: BreadcrumbItem[] = []

	let headerText = pageUrls.grammar.name

	if (sourceLanguage) {
		breadcrumbItems.push({
			name: pageUrls.grammar.name,
			path: pageUrls.grammar.path,
		})

		headerText = getLanguageName(sourceLanguage)
	}

	const isArticlePage = Boolean(articleSlug)

	return { breadcrumbItems, headerText, isArticlePage }
}

export default function GrammarRootLayout({ children }: { children: React.ReactNode }) {
	const { breadcrumbItems, headerText, isArticlePage } = useGrammarNavigation()

	// На странице статьи свой layout (серверный, с заголовком из MDX)
	if (isArticlePage) {
		return children
	}

	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs items={breadcrumbItems} />
				<Header>{headerText}</Header>
				{children}
			</PageContentWrapper>
		</PageWrapper>
	)
}
