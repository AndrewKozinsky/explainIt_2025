// import { MDXRemote } from 'next-mdx-remote/rsc'
// import { mdxComponentsRouter } from '@/ui/articleBuilder/mdxComponentsRouter'
// import { getLessonBySlug } from '../fn/getLessonBySlug'

/*type GrammarArticlePageProps = {
	sourceLanguage: string
	category: string
	articleSlug: string
}*/

/*export default async function GrammarArticlePage(props: GrammarArticlePageProps) {
	const { sourceLanguage, category, articleSlug } = props
	const lesson = await getLessonBySlug(sourceLanguage, category, articleSlug)

	if (!lesson) {
		return (
			<div>
				<h1>Not found</h1>
				<p>Lesson not found.</p>
			</div>
		)
	}

	return <MDXRemote source={lesson.content} components={mdxComponentsRouter} />
}*/
