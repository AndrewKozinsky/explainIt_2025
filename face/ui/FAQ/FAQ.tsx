'use client'

import React from 'react'
import cn from 'classnames'
import CloseButton from '../buttons/CloseButton/CloseButton'
import { FaqStoreType } from './fn/faqStoreTypes'
import FaqTypes from './fn/faqTypes'
import { useGetOpenCloseAnswer } from './fn/openCloseAnswer'
import { usePrepareStore } from './fn/prepareStore'
import './FAQ.scss'

type FaqProps = {
	extraClass?: string
	config: FaqTypes.Config
}

function Faq(props: FaqProps) {
	const { extraClass, config } = props

	const { store, setStore } = usePrepareStore(config)

	return (
		<section className={cn('faq', extraClass)}>
			{store.items.map((faqItemData, i) => {
				const isLastItem = store.items.length - 1 === i

				return (
					<React.Fragment key={faqItemData.itemId}>
						<FaqItem store={store} setStore={setStore} faqItemData={faqItemData} />
						{!isLastItem && <div className='faq__divider' />}
					</React.Fragment>
				)
			})}
		</section>
	)
}

export default Faq

type FaqItemProps = {
	store: FaqStoreType.State
	setStore: React.Dispatch<React.SetStateAction<FaqStoreType.State>>
	faqItemData: FaqStoreType.Item
}

function FaqItem(props: FaqItemProps) {
	const { store, setStore, faqItemData } = props

	const openAnswer = useGetOpenCloseAnswer(store, setStore, faqItemData.itemId)

	return (
		<div className='faq__item'>
			<div className='faq__item-content'>
				<div onClick={openAnswer}>
					<FaqQuestion faqQuestionConfig={faqItemData.question} />
				</div>
				{faqItemData.isAnswerOpen && (
					<div className='faq__answer-wrapper'>
						<FaqAnswer faqAnswerConfig={faqItemData.answer} />
					</div>
				)}
			</div>
			<CloseButton
				onClick={openAnswer}
				extraClass={cn('faq__button', faqItemData.isAnswerOpen && 'faq__button--pushed')}
			/>
		</div>
	)
}

type FaqQuestionProps = {
	faqQuestionConfig: FaqStoreType.Question
}

function FaqQuestion(props: FaqQuestionProps) {
	const { faqQuestionConfig } = props

	if (faqQuestionConfig.type === 'plain') {
		return <p className='faq__question'>{faqQuestionConfig.value}</p>
	}

	return <>{faqQuestionConfig.value}</>
}

type FaqAnswerProps = {
	faqAnswerConfig: FaqStoreType.Answer
}

function FaqAnswer(props: FaqAnswerProps) {
	const { faqAnswerConfig } = props

	if (faqAnswerConfig.type === 'plain') {
		return (
			<div className='faq__text-answer-wrapper'>
				{faqAnswerConfig.value.map((answerText, i) => {
					return (
						<p className='faq__answer-paragraph' key={i}>
							{answerText}
						</p>
					)
				})}
			</div>
		)
	}

	return <>{faqAnswerConfig.value}</>
}
