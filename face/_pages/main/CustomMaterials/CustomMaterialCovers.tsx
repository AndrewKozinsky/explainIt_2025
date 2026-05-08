'use client'

import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'

const covers = publicFolderFilesUrls.mainPage.booksCovers
const VISIBLE_DURATION = 2000 // How long the cover stays visible
const FADE_DURATION = 600 // Must match the SCSS transition duration
const GAP_DURATION = 1200 // Duration of the gap between images fading out and new ones appearing

function CustomMaterialCovers() {
	const [currentCover, setCurrentCover] = useState<{
		url: string
		top: number
		left: number
	} | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const [coverIndex, setCoverIndex] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	// Effect 1: Main interval loop to update the index
	useEffect(() => {
		const interval = setInterval(
			() => {
				setIsVisible(false) // Start fade-out
				setTimeout(() => {
					setCoverIndex((i) => (i + 1) % covers.length)
				}, FADE_DURATION + GAP_DURATION) // Add gap duration here
			},
			VISIBLE_DURATION + FADE_DURATION + GAP_DURATION,
		) // Add gap duration here too

		return () => {
			clearInterval(interval)
		}
	}, [])
	// Effect 2: Select a new cover when the index changes
	useEffect(() => {
		if (!containerRef.current) {
			// Ensure the container is mounted before doing calculations
			const initTimeout = setTimeout(() => setCoverIndex(0), 50)
			return () => clearTimeout(initTimeout)
		}

		const containerWidth = containerRef.current.offsetWidth
		const containerHeight = containerRef.current.offsetHeight
		const coverWidth = 100
		const coverHeight = 150

		const newCover = {
			url: covers[coverIndex],
			top: Math.random() * (containerHeight - coverHeight),
			left: Math.random() * (containerWidth - coverWidth),
		}
		setCurrentCover(newCover)
	}, [coverIndex])

	// Effect 3: Fade-in the new cover
	useEffect(() => {
		if (currentCover) {
			const fadeInTimeout = setTimeout(() => {
				setIsVisible(true)
			}, 50) // Small delay for browser reflow

			return () => clearTimeout(fadeInTimeout)
		}
	}, [currentCover])

	return (
		<div className='custom-materials__covers-container' ref={containerRef}>
			{currentCover && (
				<img
					key={currentCover.url}
					src={currentCover.url}
					alt='Book cover'
					className={cn('custom-materials__cover-image', {
						'custom-materials__cover-image--visible': isVisible,
					})}
					style={{
						top: `${currentCover.top}px`,
						left: `${currentCover.left}px`,
					}}
				/>
			)}
		</div>
	)
}

export default CustomMaterialCovers
