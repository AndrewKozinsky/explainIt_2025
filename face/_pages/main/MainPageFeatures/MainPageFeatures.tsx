'use client'

import React, { useRef } from 'react'
import { filesUrls } from 'utils/filesUrls'
import './MainPageFeatures.scss'

function MainPageFeatures() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const scrollBy = (amount: number) => {
		scrollContainerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
	}

	return (
		<div className='main-page-features-wrapper'>
			<div className='main-page-features' ref={scrollContainerRef}>
				<div className='main-page-feature'>
					<img
						src={filesUrls.mainPage.features.phone['1x']}
						srcSet={`${filesUrls.mainPage.features.phone['2x']} 2x`}
						className='main-page-feature__image'
						alt='phone'
					/>
					<p className='main-page-feature__text'>
						<span className='main-page-feature__text--bold'>Получайте перевод</span> предложения, фразы и
						примеры использования нажимая на слово прямо в тексте.
					</p>
				</div>
				<div className='main-page-feature__sign'>✦</div>
				<div className='main-page-feature'>
					<img
						src={filesUrls.mainPage.features.dictionary['1x']}
						srcSet={`${filesUrls.mainPage.features.dictionary['2x']} 2x`}
						className='main-page-feature__image'
						alt='phone'
					/>
					<p className='main-page-feature__text'>
						<span className='main-page-feature__text--bold'>Работайте с новыми фразами:</span>
						читайте транскрипцию, слушайте произношение и сохраняйте в словарь.
					</p>
				</div>
				<div className='main-page-feature__sign'>✦</div>
				<div className='main-page-feature'>
					<img
						src={filesUrls.mainPage.features.assistant['1x']}
						srcSet={`${filesUrls.mainPage.features.assistant['2x']} 2x`}
						className='main-page-feature__image'
						alt='phone'
					/>
					<p className='main-page-feature__text'>
						<span className='main-page-feature__text--bold'>Спрашивайте ассистента</span> про грамматику,
						нюансы употребления и смысл в контексте.
					</p>
				</div>
			</div>
			<div className='main-page-features__controls'>
				<button className='scroll-button' onClick={() => scrollBy(-336)}>
					←
				</button>
				<button className='scroll-button' onClick={() => scrollBy(336)}>
					→
				</button>
			</div>
		</div>
	)
}

export default MainPageFeatures
