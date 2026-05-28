// import { SectionWithHeader } from '@/ui/SectionWithHeader/SectionWithHeader'
// import { getAllLessons } from '../fn/getAllLessons'
// import GrammarLink from '../GrammarLink/GrammarLink'
// import { pageUrls } from 'сonsts/pageUrls'

/*type GrammarArticlesListProps = {
	sourceLanguage: string
	category: string
}*/

/*export default async function GrammarArticlesList(props: GrammarArticlesListProps) {
	const { sourceLanguage, category } = props
	const lessons = await getAllLessons(sourceLanguage, category)

	const categoryLabel =
		category === 'phrasalVerbs' ? 'Фразовые глаголы' : category === 'expressions' ? 'Выражения' : category

	return (
		<SectionWithHeader title={categoryLabel}>
			{lessons.map((lesson) => (
				<GrammarLink
					key={lesson.lesson_id}
					name={lesson.title}
					href={pageUrls.grammar.article(sourceLanguage, category, lesson.slug).path}
				/>
			))}
		</SectionWithHeader>
	)
}*/
