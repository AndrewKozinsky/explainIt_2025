'use client'

import { useRef } from 'react'
import cn from 'classnames'
import CallToActionCard from './CallToActionCard'
import { useCallToActionState } from './fn/useCallToActionState'
import './MainPageCallToAction.scss'

/**
 * Блок главной страницы: призыв выбрать сюжет и начать диалог.
 * Пока до блока не докрутили, он прилипает к низу экрана в свёрнутом виде,
 * а на своём месте раскрывается. Пока виден баннер со своей кнопкой, прилипший блок спрятан
 */
function MainPageCallToAction() {
	const sectionRef = useRef<HTMLElement>(null)
	const { isInPlace, isBannerVisible } = useCallToActionState(sectionRef)

	return (
		<section
			className={cn('call-to-action', !isInPlace && isBannerVisible && 'call-to-action--hidden')}
			ref={sectionRef}
		>
			{/* Невидимая раскрытая копия задаёт секции постоянную высоту: свёрнутая карточка прижата к её низу
			и раскрывается вверх, не сдвигая страницу */}
			<div className='call-to-action__sizer' aria-hidden='true' inert>
				<CallToActionCard isExpanded />
			</div>
			<CallToActionCard isExpanded={isInPlace} extraClass='call-to-action__card--live' />
		</section>
	)
}

export default MainPageCallToAction
