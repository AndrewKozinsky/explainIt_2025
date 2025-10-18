import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import MainPageBlockWrapper from '../MainPageBlockWrapper/MainPageBlockWrapper'
import './WhatWillYouGetAfterAnalysis.scss'

function WhatWillYouGetAfterAnalysis() {
	return (
		<MainPageBlockWrapper header='Что получаете после анализа'>
			<div className='what-will-you-get-after-analysis-block'>
				<div className='what-will-you-get-after-analysis-block__top-block'>
					<div>
						<Paragraph fontSize={16}>Перевод самого предложения.</Paragraph>
						<img
							src='/mainPage/sentence-analysis.png'
							className='what-will-you-get-after-analysis-block__top-block-img'
							alt='Перевод самого предложения'
						/>
					</div>

					<div>
						<Paragraph fontSize={16}>
							Краткий перевод непонятного слова или фразы и его разбор в контексте предложения.
						</Paragraph>
						<img
							src='/mainPage/phrase-analysis.png'
							className='what-will-you-get-after-analysis-block__top-block-img'
							alt='Разбор фразы'
						/>
					</div>

					<div>
						<Paragraph fontSize={16}>Примеры предложений с этой фразой из реальных книг.</Paragraph>
						<img
							src='/mainPage/examples-analysis.png'
							className='what-will-you-get-after-analysis-block__top-block-img'
							alt='Примеры предложений'
						/>
					</div>
				</div>
				<Paragraph fontSize={16}>
					Практика показала, что такой анализ требует меньше усилий для запоминания перевода. Понимание
					приходит быстрее, и чтение перестаёт быть борьбой с каждым предложением и испытанием воли, а
					превращается в увлекательное и полезное занятие. А значит, появляется главное — желание продолжать.
				</Paragraph>
				<Paragraph fontSize={16}>
					Программа специально спроектирована для чтения книг на иностранном языке: всё помещено в одном окне
					и никуда переходить не нужно. Вам не потребуется копировать слова и переносить в другое приложение.
					Просто указываете непонятное слово и запрашиваете перевод. А в самом тексте видны уже разобранные
					предложения и фразы.
				</Paragraph>
			</div>
		</MainPageBlockWrapper>
	)
}

export default WhatWillYouGetAfterAnalysis
