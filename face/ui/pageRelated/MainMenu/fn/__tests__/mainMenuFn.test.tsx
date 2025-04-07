// import { renderHook } from '@testing-library/react'
// import { useIsCurrentPage } from '../mainMenuFn'

// const usePathnameMock = jest.fn()

/*jest.mock('next/navigation', () => {
	return {
		usePathname: () => usePathnameMock(),
	}
})*/

/*describe('useIsCurrentPage function', () => {
	beforeEach(() => {
		usePathnameMock.mockClear()
	})

	it('should return true if linkUrl param is match to the page uri', () => {
		usePathnameMock.mockReturnValueOnce('/')

		const { result } = renderHook(() => useIsCurrentPage('/'))

		expect(result.current).toBe(true)
	})

	it('should return true if the page uri is starts to the linkUrl param', () => {
		usePathnameMock.mockReturnValueOnce('/inner/2')

		const { result } = renderHook(() => useIsCurrentPage('/inner'))

		expect(result.current).toBe(true)
	})

	it('should return false if the page uri is not starts to the linkUrl param', () => {
		usePathnameMock.mockReturnValueOnce('/inner/2')

		const { result } = renderHook(() => useIsCurrentPage('/contacts'))

		expect(result.current).toBe(false)
	})
})*/
