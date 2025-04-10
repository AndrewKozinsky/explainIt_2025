import CourseArticlePage from '../../../_pages/courseArtPage/courseArticlePage/CourseArticlePage/CourseArticlePage'
import articleService from '../../../articleBuilder/articleService/articleService'

type TextBookArticleProps = {
	params: {
		// Название статьи в адресной строке
		articleSlug: string
	}
}

// Универсальная страница учебника
export default function Page(props: TextBookArticleProps) {
	const { articleSlug } = props.params

	const prevArticle = articleService.getArticle(articleSlug, 'prev')
	const article = articleService.getArticle(articleSlug, 'this')
	const nextArticle = articleService.getArticle(articleSlug, 'next')

	if (!article) {
		return <p>Глава не найдена.</p>
	}

	return <CourseArticlePage prevArticle={prevArticle} article={article} nextArticle={nextArticle} />
}
