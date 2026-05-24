import Link from 'next/link'
import { getAllLessons } from './fn/getAllLessons'
import { pageUrls } from 'сonsts/pageUrls'

type LessonSectionProps = {
	title: string
	subDir: string
}

export default async function LessonSection(props: LessonSectionProps) {
	const { title, subDir } = props
	const lessons = await getAllLessons(subDir)

	if (!lessons.length) return null

	return (
		<div>
			<h3>{title}</h3>
			<ul>
				{lessons.map((lesson) => (
					<li key={lesson.lesson_id}>
						<Link href={pageUrls.expressions.article(lesson.slug).path}>{lesson.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
