import React from 'react'
import Link from 'next/link'
import { getAllLessons } from './fn/getAllLessons'
import { pageUrls } from 'сonsts/pageUrls'

async function ExpressionsList() {
	const lessons = await getAllLessons()

	return (
		<div>
			<h2>Articles</h2>
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

export default ExpressionsList
