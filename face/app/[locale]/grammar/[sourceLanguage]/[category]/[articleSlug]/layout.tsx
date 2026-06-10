import React from 'react'
import { getLocale } from 'next-intl/server'
import Header from 'ui/Header/Header'
import { BreadCrumbs } from 'ui/pageRelated/BreadCrumbs/BreadCrumbs'
import { PageContentWrapper } from 'ui/pageRelated/PageContentWrapper/PageContentWrapper'
import { PageWrapper } from 'ui/pageRelated/PageWrapper/PageWrapper'
import { getArticleMeta } from 'utils/contentFolder'
import { type LanguageCode, languages } from 'utils/languages'
import { pageUrls } from 'utils/pageUrls'

type ArticleLayoutProps = {
	children: React.ReactNode
	params: Promise<{
		sourceLanguage: string
		category: string
		articleSlug: string
	}>
}

function getLanguageName(code: string): string {
	return languages[code as LanguageCode]?.name ?? code
}

export default async function GrammarArticleLayout(props: ArticleLayoutProps) {
	const { children } = props
	const { sourceLanguage, category, articleSlug } = await props.params
	const locale = await getLocale()

	const meta = getArticleMeta(locale, sourceLanguage, category, articleSlug)
	const title = meta?.title ?? articleSlug

	const breadcrumbItems = [
		{ name: pageUrls.grammar.name, path: pageUrls.grammar.path },
		{ name: getLanguageName(sourceLanguage), path: pageUrls.grammar.language(sourceLanguage).path },
	]

	return (
		<PageWrapper top bottom>
			<PageContentWrapper>
				<BreadCrumbs items={breadcrumbItems} />
				<Header>{title}</Header>
				{children}
			</PageContentWrapper>
		</PageWrapper>
	)
}
