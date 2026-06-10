import Article from '@/ui/Article/Article'
import { getLessonBySlug } from './fn/getLessonBySlug'

type TopicContentProps = {
	sourceLanguage: string
	category: string
	articleSlug: string
}

export default async function TopicContent(props: TopicContentProps) {
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

	return <Article content={lesson.content} />
}
