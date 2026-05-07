'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import './MainPageGallery.scss'
import { publicFolderFilesUrls } from '../../../utils/publicFolderFilesUrls'

interface ImageDisplayData {
	id: string // Unique ID for keying
	src: string
	position: number // 0 for rightmost, 1 for next left, etc.
	scale: number
	translateX: number
	zIndex: number
	opacity: number
	isEntering: boolean // Flag to indicate if this is a newly entering image
	isExiting: boolean // Flag to indicate if this image is currently exiting
}

const VISIBLE_IMAGES_COUNT = 6
const TRANSITION_INTERVAL = 2000 // 2 seconds
const INITIAL_OFFSET_X = 100 // How far right off-screen to start for entering image
const CSS_TRANSITION_DURATION_MS = 700 // Must match CSS transition duration

const CONTAINER_MAX_WIDTH = 500 // Corresponds to .main-page-gallery max-width in SCSS
const IMAGE_MAX_WIDTH_AT_SCALE_1 = 250 // Corresponds to .main-page-gallery__image max-width in SCSS
const BASE_INITIAL_STEP = 120 // The default starting gap between the first two images
const STEP_DIVISOR = 1.7 // How much the gap decreases for subsequent images
const ALIGNMENT_FUDGE_FACTOR = 25 // Increased Extra pixels to push the layout to the left to ensure it touches the edge

const calculateTranslateX = (position: number, extraGapPerStep: number): number => {
	if (position === 0) return 0
	const initialStep = BASE_INITIAL_STEP + extraGapPerStep
	let totalTranslate = 0
	let step = initialStep
	for (let p = 1; p <= position; p++) {
		totalTranslate -= step
		step /= STEP_DIVISOR
	}
	return totalTranslate
}

const useFinalLayoutGap = () => {
	return useMemo(() => {
		const finalLeftmostPosition = VISIBLE_IMAGES_COUNT - 1
		if (finalLeftmostPosition < 1) return 0

		const defaultTranslateX = calculateTranslateX(finalLeftmostPosition, 0)
		const leftmostImageScale = 1 - finalLeftmostPosition * 0.1
		const leftmostImageScaledWidth = IMAGE_MAX_WIDTH_AT_SCALE_1 * leftmostImageScale
		const defaultClusterWidth = Math.abs(defaultTranslateX - leftmostImageScaledWidth)

		let extraGap = 0
		if (defaultClusterWidth < CONTAINER_MAX_WIDTH) {
			const spaceToFill = CONTAINER_MAX_WIDTH - defaultClusterWidth + ALIGNMENT_FUDGE_FACTOR
			let sumOfFactors = 0
			let factor = 1
			for (let i = 0; i < VISIBLE_IMAGES_COUNT - 1; i++) {
				sumOfFactors += factor
				factor /= STEP_DIVISOR
			}
			if (sumOfFactors > 0) {
				extraGap = spaceToFill / sumOfFactors
			}
		}
		return extraGap
	}, []) // Empty dependency array ensures this is calculated only once
}

function MainPageGallery() {
	const allImages = publicFolderFilesUrls.mainPage.booksCovers
	const totalImages = allImages.length

	const finalExtraGap = useFinalLayoutGap()
	const [currentImageHeadIndex, setCurrentImageHeadIndex] = useState(0)
	const [visibleCount, setVisibleCount] = useState(0)
	const [displayedImages, setDisplayedImages] = useState<ImageDisplayData[]>([])
	const displayedImagesRef = useRef<ImageDisplayData[]>([])

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageHeadIndex((prevIndex) => (prevIndex + 1) % totalImages)
			if (visibleCount < VISIBLE_IMAGES_COUNT) {
				setVisibleCount((prevCount) => prevCount + 1)
			}
		}, TRANSITION_INTERVAL)
		return () => clearInterval(interval)
	}, [totalImages, visibleCount])

	useEffect(() => {
		if (visibleCount === 0) {
			setDisplayedImages([])
			displayedImagesRef.current = []
			return
		}

		const prevImages = displayedImagesRef.current
		const newImages: ImageDisplayData[] = []
		const currentCalculatedImageIds = new Set<string>()

		for (let position = 0; position < visibleCount; position++) {
			const imageGlobalIndex = (currentImageHeadIndex - position + totalImages) % totalImages
			const src = allImages[imageGlobalIndex]
			const id = `${src}-${imageGlobalIndex}`
			currentCalculatedImageIds.add(id)

			const scale = 1 - position * 0.1
			const translateX = calculateTranslateX(position, finalExtraGap)
			const zIndex = VISIBLE_IMAGES_COUNT - position
			const isEntering = position === 0 && !prevImages.some((img) => img.id === id)

			newImages.push({
				id,
				src,
				position,
				scale,
				translateX,
				zIndex,
				opacity: 1,
				isEntering,
				isExiting: false,
			})
		}

		const exitingImages = prevImages
			.filter((img) => !currentCalculatedImageIds.has(img.id) && !img.isExiting)
			.map((img) => {
				const exitPosition = VISIBLE_IMAGES_COUNT
				const exitScale = 1 - exitPosition * 0.1
				const exitTranslateX = calculateTranslateX(exitPosition, finalExtraGap)

				return {
					...img,
					isExiting: true,
					opacity: 0,
					scale: exitScale,
					translateX: exitTranslateX,
					zIndex: 0, // Ensure it's behind other images
				}
			})

		const imagesToDisplayNext = [...newImages, ...exitingImages]

		setDisplayedImages(imagesToDisplayNext)
		displayedImagesRef.current = imagesToDisplayNext

		if (imagesToDisplayNext.some((img) => img.isEntering)) {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setDisplayedImages((current) => {
						const updated = current.map((img) => (img.isEntering ? { ...img, isEntering: false } : img))
						displayedImagesRef.current = updated
						return updated
					})
				})
			})
		}

		if (exitingImages.length > 0) {
			const timeout = setTimeout(() => {
				setDisplayedImages((current) => {
					const filtered = current.filter((img) => !img.isExiting)
					displayedImagesRef.current = filtered
					return filtered
				})
			}, CSS_TRANSITION_DURATION_MS)
			return () => clearTimeout(timeout)
		}
	}, [currentImageHeadIndex, visibleCount, allImages, totalImages, finalExtraGap])

	return (
		<div className='main-page-gallery'>
			{displayedImages.map((imageData) => (
				<img
					key={imageData.id}
					src={imageData.src}
					alt='Book Cover'
					className='main-page-gallery__image'
					style={{
						transform: `translateX(${imageData.isEntering ? imageData.translateX + INITIAL_OFFSET_X : imageData.translateX}px) scale(${imageData.scale})`,
						zIndex: imageData.zIndex,
						opacity: imageData.isEntering ? 0 : imageData.opacity,
					}}
				/>
			))}
		</div>
	)
}

export default MainPageGallery
