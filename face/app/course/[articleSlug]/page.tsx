// import CourseArticlePage from '../../../_pages/courseArtPage/courseArticlePage/CourseArticlePage/CourseArticlePage'
// import CourseLevelPage from '../../../_pages/courseArtPage/courseLevelPage/CourseLevelPage/CourseLevelPage'
// import CourseWelcomePage from '../../../_pages/courseArtPage/courseWelcomePage/CourseWelcomePage/CourseWelcomePage'
// import articleService from '../../../articleService/articleService'
// import ArticleType from '../../../articlesData/articleType'

/*type TextBookArticleProps = {
	params: {
		// Название статьи в адресной строке
		articleSlug: string
	}
}*/

// Универсальная страница учебника
/*export default async function Page(props: TextBookArticleProps) {
	const {
		params: { articleSlug },
	} = props

	const prevArticle = articleService.getArticle(articleSlug, 'prev')
	const article = articleService.getArticle(articleSlug, 'this')
	const nextArticle = articleService.getArticle(articleSlug, 'next')

	if (!article) {
		return <p>Глава не найдена.</p>
	}

	if (article.type == ArticleType.ArtType.welcome) {
		return (
			<CourseWelcomePage
				prevArticle={prevArticle}
				article={article}
				nextArticle={nextArticle}
			/>
		)
	} else if (article.type == ArticleType.ArtType.level) {
		return (
			<CourseLevelPage
				prevArticle={prevArticle}
				article={article}
				nextArticle={nextArticle}
			/>
		)
	} else if (article.type == ArticleType.ArtType.article) {
		return (
			<CourseArticlePage
				prevArticle={prevArticle}
				article={article}
				nextArticle={nextArticle}
			/>
		)
	}

	return <p>Unknown page</p>
}*/
