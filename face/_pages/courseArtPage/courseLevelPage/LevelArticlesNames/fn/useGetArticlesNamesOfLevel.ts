// import { useMemo } from 'react'
// import articleService from '../../../../../articleService/articleService'
// import ArticleType from '../../../../../articlesData/articleType'

/**
 * Хук принимает обозначение уровня и возвращает массив названий глав разделённых символом звёздочки
 * @param level — уровень языка
 */
/*export function useGetArticlesNamesOfLevel(level: ArticleType.LangLevel): string[] {
	return useMemo(function () {
		// Сформировать названия статей уровня языка -> ['Name 1', 'Name 2']
		const articles = articleService.getArticlesOfLevel(level)
		const articlesNames = articles.map((article) => article.name)

		// Разделить названия символом звёздочки -> ['Name 1', '*', 'Name 2']
		for (let i = 0; i < articlesNames.length; i++) {
			if (i < 1) continue

			articlesNames.splice(i, 0, '*')
			i++
		}

		return articlesNames
	}, [])
}*/
