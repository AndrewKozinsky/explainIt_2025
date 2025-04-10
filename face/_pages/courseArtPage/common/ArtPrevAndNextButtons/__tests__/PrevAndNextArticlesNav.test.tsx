// import { render, screen } from '@testing-library/react'
// import ArticleType from '../../../../../articlesData/articleType'
// import { PrevAndNextArticlesNav } from '../PrevAndNextArticlesNav'

/*describe('PrevAndNextArticlesNav component', () => {
	it('should not render component if passed no previous article nor next one', () => {
		render(<PrevAndNextArticlesNav prevArticle={null} nextArticle={null} />)

		expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
	})

	it('should render component with empty div as a next link if passed no next article and a link if previous article was passed', () => {
		const prevArtArticle: ArticleType.Art = {

			meta: {
				number: 4,
				caption: 'Глава 3',
				slug: 'personal-pronouns',
				articleName: 'Личные местоимения',
				articleDescription: 'Личные местоимения в английском языке.',
				isPaid: false,
			},
			content: [],
		}

		const { container } = render(
			<PrevAndNextArticlesNav prevArticle={prevArtArticle} nextArticle={null} />,
		)
		const prevLinkElem = container.children[0].children[0]
		const nextLinkElem = container.children[0].children[1]

		expect(screen.queryByRole('navigation')).toBeInTheDocument()
		expect(prevLinkElem.tagName).toBe('A')
		expect(nextLinkElem.tagName).toBe('DIV')
	})

	it('should render component with empty div as a previous link if passed no previous article and a link if next article was passed', () => {
		const nextArtArticle: ArticleType.Art = {

			meta: {
				number: 4,
				caption: 'Глава 3',
				slug: 'personal-pronouns',
				articleName: 'Личные местоимения',
				articleDescription: 'Личные местоимения в английском языке.',
				isPaid: false,
			},
			content: [],
		}

		const { container } = render(
			<PrevAndNextArticlesNav prevArticle={null} nextArticle={nextArtArticle} />,
		)
		const prevLinkElem = container.children[0].children[0]
		const nextLinkElem = container.children[0].children[1]

		expect(screen.queryByRole('navigation')).toBeInTheDocument()
		expect(prevLinkElem.tagName).toBe('DIV')
		expect(nextLinkElem.tagName).toBe('A')
	})
})*/
