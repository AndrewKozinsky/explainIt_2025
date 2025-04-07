// import { render, screen } from '@testing-library/react'
// import { PrevAndNextButtonConfig, PrevAndNextButtons } from '../PrevAndNextButtons'

/*describe('ArtPrevAndNextButtons component', () => {
	it('should not render component if passed no previous article nor next one', () => {
		render(<PrevAndNextButtons />)

		expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
	})

	it('should render component with empty div as a next link if passed no next article and a link if previous article was passed', () => {
		const prevLinkConfig: PrevAndNextButtonConfig = {
			topText: 'topText 1',
			name: 'name 1',
			description: 'description 1',
			href: '/href',
		}

		const { container } = render(<PrevAndNextButtons backConfig={prevLinkConfig} />)
		const prevLinkElem = container.children[0].children[0]
		const nextLinkElem = container.children[0].children[1]

		expect(screen.queryByRole('navigation')).toBeInTheDocument()
		expect(prevLinkElem.tagName).toBe('A')
		expect(nextLinkElem.tagName).toBe('DIV')
	})

	it('should render component with empty div as a previous link if passed no previous article and a link if next article was passed', () => {
		const nextLinkConfig: PrevAndNextButtonConfig = {
			topText: 'topText 1',
			name: 'name 1',
			description: 'description 1',
			href: '/href',
		}

		const { container } = render(<PrevAndNextButtons nextConfig={nextLinkConfig} />)
		const prevLinkElem = container.children[0].children[0]
		const nextLinkElem = container.children[0].children[1]

		expect(screen.queryByRole('navigation')).toBeInTheDocument()
		expect(prevLinkElem.tagName).toBe('DIV')
		expect(nextLinkElem.tagName).toBe('A')
	})
})*/
