import ExpressionLink from '_pages/expressions/expressions/ExpressionsList/ExpressionLink/ExpressionLink'
import { getAllLessons } from './fn/getAllLessons'
import { pageUrls } from 'сonsts/pageUrls'
import './LessonSection.scss'

type LessonSectionProps = {
	subDir: string
}

export default async function LessonSection(props: LessonSectionProps) {
	const { subDir } = props
	const lessons = await getAllLessons(subDir)

	if (!lessons.length) return null

	return (
		<div className='lessons-list'>
			{lessons.map((lesson) => (
				<ExpressionLink
					key={lesson.lesson_id}
					name={lesson.title}
					subName={null}
					href={pageUrls.expressions.article(lesson.slug).path}
				/>
			))}
		</div>
	)
}
