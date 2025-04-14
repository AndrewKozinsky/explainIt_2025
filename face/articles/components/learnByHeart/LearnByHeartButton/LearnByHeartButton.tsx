// 'use client'

// import React from 'react'
// import ArticleType from '../../../../articlesData/articleType'
// import { ModalIcon } from '../../../../ui/icons/ModalIcon/ModalIcon'
// import { useGetOpenCloseModal } from '../LearnByHeartModal/fn/clickOnBlock'
// import LearnByHeartModal from '../LearnByHeartModal/LearnByHeartModal'
// import { useLearnByHeartStore } from '../store/store'
// import { useSetWordsToStore } from './fn/useSetWordsToStore'
// import './LearnByHeartButton.scss'

/*type ExercisesProps = {
	article: null | ArticleType.Art
}*/

/**
 * Кнопка перехода к модальному окну со списком слов для заучивания
 */
/*function LearnByHeartButton(props: ExercisesProps) {
	const { article } = props

	useSetWordsToStore(article)

	const { wordObjs } = useLearnByHeartStore()

	if (!article || article.type !== ArticleType.ArtType.article || !wordObjs.length) {
		return null
	}

	return (
		<>
			<ButtonWrapper>
				<div className="learn-by-heart-button__bg" />
				<div className="learn-by-heart-button__content">
					<h2 className="learn-by-heart-button__header">Слова следующей главы</h2>
					<p className="learn-by-heart-button__header-info">
						Выучите, чтобы без подсказок переводить предложения в следующей главе.
					</p>
					<WordsParagraph />
				</div>
				<div className="learn-by-heart-button__divider" />
				<div className="learn-by-heart-button__right-part">
					<ModalIcon />
				</div>
			</ButtonWrapper>
			<LearnByHeartModal />
		</>
	)
}*/

// export default LearnByHeartButton

/*type ButtonWrapperProps = {
	children: React.ReactNode[]
}*/

/** Кнопка открывающая модальное окно списка слов для заучивания */
/*function ButtonWrapper(props: ButtonWrapperProps) {
	const { children } = props

	const openModal = useGetOpenCloseModal(true)

	return (
		<button className="learn-by-heart-button" onClick={openModal}>
			{children}
		</button>
	)
}*/

/** Абзац текста с примерами слов для заучивания */
/*function WordsParagraph() {
	const { wordObjs } = useLearnByHeartStore()

	return (
		<p className="learn-by-heart-button__words">
			{wordObjs.map((wordObj) => {
				const word = wordObj.engWord

				return (
					<React.Fragment key={word}>
						<span>{word}</span>
						<span className="learn-by-heart-button__word-divider" />
					</React.Fragment>
				)
			})}
		</p>
	)
}*/
