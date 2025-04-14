import CourseArticlePage from '../../../_pages/courseArticlePage/courseArticlePage/CourseArticlePage/CourseArticlePage'
import articleService from '../../../articles/articleService/articleService'

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
