import { useEffect, useState } from 'react'

type UseRotateCoverOnClickResult = {
	activeCoverIndex: number
	handleCoverClick: () => void
}

export function useGetCoverOnClick(coverUrls: string[]): UseRotateCoverOnClickResult {
	const [activeCoverIndex, setActiveCoverIndex] = useState(0)

	useEffect(() => {
		if (!coverUrls.length) return

		if (activeCoverIndex > coverUrls.length - 1) {
			setActiveCoverIndex(0)
		}
	}, [activeCoverIndex, coverUrls])

	function handleCoverClick() {
		if (!coverUrls.length) return

		setActiveCoverIndex((currentIndex) => {
			return (currentIndex + 1) % coverUrls.length
		})
	}

	return { activeCoverIndex, handleCoverClick }
}
