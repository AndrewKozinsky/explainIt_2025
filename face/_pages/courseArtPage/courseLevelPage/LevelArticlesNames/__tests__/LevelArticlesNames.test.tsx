// import { render, screen } from '@testing-library/react'
// import ArticleType from '../../../../../articlesData/articleType'
// import LevelArticlesNames from '../LevelArticlesNames'

/*jest.mock('../fn/useGetArticlesNamesOfLevel', () => {
	return {
		useGetArticlesNamesOfLevel: () => ['Name 11', '*', 'Name 12', '*', 'Name 13'],
	}
})*/

/*describe('LevelArticlesNames', () => {
	it('should render paragraph with 3 articles names divided by star', () => {
		const { container } = render(<LevelArticlesNames level={ArticleType.LangLevel.a1} />)

		// Абзац со всеми названиями глав
		const paragraph = container.firstChild! as HTMLParagraphElement

		expect(screen.getByTestId('level-articles-names')).toBeInTheDocument()
		expect(paragraph.querySelectorAll('span')).toHaveLength(2)

		// Проверка, что у детей такой же текст, как в возвращённом массиве.
		expect(paragraph.childNodes).toHaveLength(5)
		expect(paragraph.childNodes[0].textContent).toBe('Name 11')
		expect(paragraph.childNodes[1].textContent).toBe('✦')
		expect(paragraph.childNodes[2].textContent).toBe('Name 12')
		expect(paragraph.childNodes[3].textContent).toBe('✦')
		expect(paragraph.childNodes[4].textContent).toBe('Name 13')
	})
})*/
