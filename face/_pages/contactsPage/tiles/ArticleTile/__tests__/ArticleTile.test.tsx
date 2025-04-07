// import React from 'react'
// import { render, screen } from '@testing-library/react'
// import ArticleType from '../../../../../articlesData/articleType'
// import ArticleTile from '../ArticleTile'

/*describe('ArticleTile', () => {
	it('should render a tile of type Welcome', () => {
		render(<ArticleTile tile={{ type: 'welcome', url: '/' }} />)

		const $tile = screen.getByRole('link')
		expect($tile).toBeInTheDocument()
		expect($tile.textContent).toBe('Добропожаловатьна курс!')
	})

	it('should render a tile of type Level', () => {
		render(
			<ArticleTile
				tile={{
					type: 'level',
					level: ArticleType.LangLevel.a1,
					name: ArticleType.LangLevelName.a1,
					url: '/',
				}}
			/>,
		)

		const $tile = screen.getByRole('link')
		expect($tile).toBeInTheDocument()
		expect(screen.getByTestId('lang-level-badge')).toBeInTheDocument()
	})

	it('should render a tile of type Article', () => {
		const top = 'Глава 1'
		const header = 'Личные местоимения'
		const description =
			'Кратко рассмотрено для чего перед каждым существительным нужно ставить определитель и разберём неопределённый артикль a/an.'
		render(
			<ArticleTile
				tile={{
					type: 'article',
					top,
					header,
					description,
					url: '/',
				}}
			/>,
		)

		const $tile = screen.getByRole('link')
		expect($tile).toBeInTheDocument()
		expect(screen.getByTestId('article-tile-article-top').textContent).toBe(top)
		expect(screen.getByTestId('article-tile-article-header').textContent).toBe(header)
		expect(screen.getByTestId('article-tile-article-description').textContent).toBe(description)
	})

	it('should render a tile of type Media', () => {
		render(
			<ArticleTile
				tile={{
					type: 'media',
					url: '/',
				}}
			/>,
		)

		const $tile = screen.getByRole('link')
		expect($tile).toBeInTheDocument()
		expect(screen.getByRole('img')).toBeInTheDocument()
		expect(screen.getByTestId('article-tile-pill').textContent).toBe('Фильмы')
	})
})*/
