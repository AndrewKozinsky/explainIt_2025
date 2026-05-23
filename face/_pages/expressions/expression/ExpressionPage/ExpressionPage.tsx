import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponentsRouter } from '@/ui/articleBuilder/components/mdxComponentsRouter'
import { getLessonBySlug } from './fn/getLessonBySlug'

export default async function ExpressionPage({ params }: { params: Promise<{ articleSlug: string }> }) {
	const { articleSlug } = await params
	const lesson = await getLessonBySlug(articleSlug)

	if (!lesson) {
		return (
			<div>
				<h1>Not found</h1>
				<p>Lesson not found.</p>
			</div>
		)
	}

	return (
		<div>
			<h1>{lesson.frontmatter.title}</h1>
			<MDXRemote source={lesson.content} components={mdxComponentsRouter} />
		</div>
	)
}
