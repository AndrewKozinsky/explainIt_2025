// import { render, screen } from '@testing-library/react'
// import { LinkLogoWithText } from '../LinkLogoWithText'

// let usePathnameMock = jest.fn()

/*jest.mock("next/navigation", () => {
	return {
		usePathname: () => usePathnameMock(),
	}
})*/

/*describe('LogoWithText', () => {
	it('should render component without a link', () => {
		usePathnameMock.mockReturnValueOnce("/")

		const { container } = render(<LinkLogoWithText />)

		expect(screen.getByTestId('defaultLogoWithText')).toBeInTheDocument()
		expect(container.querySelector('a')).not.toBeInTheDocument()
	})

	it('should render component with a link', () => {
		usePathnameMock.mockReturnValueOnce("/some")

		const { container } = render(<LinkLogoWithText />)

		expect(screen.getByTestId('linkLogoWithText')).toBeInTheDocument()
		expect(container.querySelector('a')).toBeInTheDocument()
	})
})*/
