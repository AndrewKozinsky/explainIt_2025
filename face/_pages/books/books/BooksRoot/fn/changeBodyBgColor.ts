import { useEffect } from 'react'

// Change body background color when a user sees this page.
// Remove style if a user leaves this page.
export function useChangeBodyBgColor() {
	useEffect(function () {
		document.body.style.backgroundColor = '#F3F3F3'

		return function () {
			document.body.style.backgroundColor = ''
		}
	}, [])
}
