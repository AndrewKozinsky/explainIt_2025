import CourseArticlePage from '../../../_pages/courseArtPage/courseArticlePage/CourseArticlePage/CourseArticlePage'
import articleService from '../../../articleBuilder/articleService/articleService'

type TextBookArticleProps = {
	params: Promise<{
		// Название статьи в адресной строке
		articleSlug: string
	}>
}

// Универсальная страница учебника
export default async function Page(props: TextBookArticleProps) {
	const { articleSlug } = await props.params

	const prevArticle = articleService.getArticle(articleSlug, 'prev')
	const article = articleService.getArticle(articleSlug, 'this')
	const nextArticle = articleService.getArticle(articleSlug, 'next')

	if (!article) {
		return <p>Глава не найдена.</p>
	}

	return <CourseArticlePage prevArticle={prevArticle} article={article} nextArticle={nextArticle} />
}

// ----

/*type TextBookArticleProps = {
	params: Promise<{
		// Название статьи в адресной строке
		articleSlug: string
	}>
}*/

/*export default function Page(props: TextBookArticleProps) {
	console.log('-------')
	console.log(props)
	console.log('-------')
	// const { articleSlug } = props.params

	const article = {
		meta: {
			number: 3,
			slug: 'present-simple-1',
			caption: 'Глава 1',
			articleName: 'Present Simple',
			articleDescription:
				'Изучим как составлять предложения в грамматическом времени Present Simple для местоимений первого и второго лица.',
			isPaid: false,
		},
		content: [],
	}

	return <CourseArticlePage prevArticle={null} article={article} nextArticle={null} />
}*/
