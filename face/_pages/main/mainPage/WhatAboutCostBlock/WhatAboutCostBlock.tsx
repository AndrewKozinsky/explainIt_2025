import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import MainPageBlockWrapper from '../MainPageBlockWrapper/MainPageBlockWrapper'
import './WhatAboutCostBlock.scss'

function WhatAboutCostBlock() {
	return (
		<MainPageBlockWrapper header='Что по стоимости'>
			<div className='what-about-cost-texts'>
				<Paragraph fontSize={20}>
					Каждое обращение к ИИ расходует баланс — в среднем 5–15 копеек. Стоимость зависит от сложности и
					количества переводимых слов .
				</Paragraph>
				<Paragraph fontSize={20}>
					Минимальное пополнение — 5 рублей. Никаких подписок и скрытых платежей — вы платите только за то,
					что используете.
				</Paragraph>
				<Paragraph fontSize={20}>
					Зарегистрируйтесь через социальную сеть и получите бонус — хватит, чтобы оценить, насколько удобно
					читать с ИИ.
				</Paragraph>
				<Paragraph fontSize={20}>
					Уже сделанные переводы сохраняются — вы можете возвращаться к ним без повторных расходов.
				</Paragraph>
			</div>
		</MainPageBlockWrapper>
	)
}

export default WhatAboutCostBlock
