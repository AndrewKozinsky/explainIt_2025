import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import MainPageBlockWrapper from '../MainPageBlockWrapper/MainPageBlockWrapper'
import './WhyAIBetterThenTranslatorBlock.scss'

function WhyAIBetterThenTranslatorBlock() {
	return (
		<MainPageBlockWrapper header='Чем лучше переводчика'>
			<div className='why-ai-better-then-translator-block'>
				<div className='why-ai-better-then-translator-block__text-block'>
					<Paragraph fontSize={16}>
						Если вы уже пробовали читать книги с переводчиком, то знаете — это прямо работа: вы открываете
						текст книги, переводчик и Блокнот чтобы конспектировать слова.
					</Paragraph>
					<Paragraph fontSize={16}>
						Каждое незнакомое слово приходится копировать, вставлять, искать подходящий перевод, снова
						копировать и записывать в Блокнот.
					</Paragraph>
					<Paragraph fontSize={16}>Через пару страниц вы уже теряете нить сюжета.</Paragraph>
				</div>
				<div className='why-ai-better-then-translator-block__text-block'>
					<Paragraph fontSize={16}>
						И такой нудный процесс не гарантирует результата. Нередко бывала ситуация когда переводчик
						предлагал на выбор 30 значений, но ни один не подходил под предложение. Из-за чего оно
						превращалось просто в набор слов. И чем больше таких смысловых пробелов, тем больше падает
						мотивация продолжать чтение.
					</Paragraph>
				</div>
				<div className='why-ai-better-then-translator-block__text-block'>
					<Paragraph fontSize={16}>
						ИИ работает иначе: анализирует всё предложение целиком, учитывает контекст книги, стиль автора и
						даже предыдущие фразы.
					</Paragraph>
					<Paragraph fontSize={16}>
						По ощущениям — будто рядом полиглот, который не просто переводит, а объясняет смысл и ведёт за
						ручку.
					</Paragraph>
				</div>
			</div>
		</MainPageBlockWrapper>
	)
}

export default WhyAIBetterThenTranslatorBlock
