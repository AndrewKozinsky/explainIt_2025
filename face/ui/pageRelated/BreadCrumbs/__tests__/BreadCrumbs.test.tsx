// import { render, screen } from '@testing-library/react'
// import { BreadCrumbs } from '../BreadCrumbs'

/*describe('BreadCrumbs', () => {
	it('should render BreadCrumbs consist of one index page link', () => {
		render(<BreadCrumbs items={[]} />)

		const rootLinkElem = screen.getByRole('link')
		expect(rootLinkElem).toBeInTheDocument()
		expect(rootLinkElem.textContent).toBe('Главная')
	})

	it('should render BreadCrumbs consist of 3 links', () => {
		render(
			<BreadCrumbs
				items={[
					{ url: 'some-url', name: 'some-name' },
					{ url: 'some-url-2', name: 'some-name-2' },
				]}
			/>,
		)

		const linkElems = screen.getAllByRole('link')
		expect(linkElems).toHaveLength(3)

		expect(linkElems[0].textContent).toBe('')
		expect(linkElems[0].getAttribute('href')).toBe('/')

		expect(linkElems[1].textContent).toBe('some-name')
		expect(linkElems[1].getAttribute('href')).toBe('some-url')

		expect(linkElems[2]).toBeInTheDocument()
	})
})*/
