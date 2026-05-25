import { getLessonBySlug } from '@/_pages/expressions/expression/ExpressionPage/fn/getLessonBySlug'
import ExpressionsLayout from '_pages/expressions/expressions/ExpressionsLayout/ExpressionsLayout'
import { pageUrls } from 'сonsts/pageUrls'

export default async function ArticleLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ articleSlug: string }>
}) {
	const { articleSlug } = await params
	const lesson = await getLessonBySlug(articleSlug)

	const headerText = lesson?.frontmatter.title ?? 'Not found'
	const breadcrumbItems = lesson ? [pageUrls.expressions] : []

	return (
		<ExpressionsLayout breadcrumbItems={breadcrumbItems} headerText={headerText}>
			{children}
		</ExpressionsLayout>
	)
}
