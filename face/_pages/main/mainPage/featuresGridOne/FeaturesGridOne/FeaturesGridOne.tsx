// import cn from 'classnames'
// import React, { ReactNode } from 'react'
// import MainPageHeader from '../../common/MainPageHeader/MainPageHeader'
// import { DateSticker } from '../DateSticker/DateSticker'
// import DictionaryWords from '../DictionaryWords/DictionaryWords'
// import { ExamplesCounter } from '../ExamplesCounter/ExamplesCounter'
// import { LastArticleFactoid } from '../LastArticleFactoid/FeaturesGridOne'
// import OrangeButtonLinkToIndex from '../OrangeButtonLinkToIndex/OrangeButtonLinkToIndex'
// import s from './FeaturesGridOne.module.scss'

/*function FeaturesGridOne() {
	return (
		<section className={s.grid}>
			<Cell
				header="В своём темпе"
				text="Все главы отрываются сразу после оплаты. Учитесь в удобное время и в любом месте где есть интернет."
				elemInText={<img src="/images/mainPage/trafficlight.svg" alt="Trafficlight sign" />}
			/>
			<Cell
				header="Вопросы для самопроверки"
				text="После многих глав есть блок с вопросами на которые вы должны ответить самостоятельно. После свой ответ можно сравнить с ответом преподавателя."
			/>
			<Cell
				header="Регулярные обновления"
				text="Курс постоянно пополняется новыми главами, а в существующие добавляются новые упражнения."
				bottomElement={<LastArticleFactoid />}
			/>
			<Cell
				header="Новые слова в каждой главе"
				text="Пополняйте словарный запас по ходу прохожения курса. Новая лексика закрепляется в упражнениях на перевод."
				bottomElement={<DictionaryWords />}
			/>
			<Cell
				header="С нуля до уровня А2 за 50 глав"
				text="Изучение начнёте с личных местоимений и постепенно будите добавлять новые языковые конструкции и увеличивать сложность составляемых предложений."
			/>
			<OrangeButtonLinkToIndex />
			<Cell
				header="Иллюстрирующие примеры"
				text="Вся теория покрыта многочисленными примерами как в предложении используется изученное правило."
				elemInText={<ExamplesCounter />}
				doubleWidth
			/>
			<Cell
				header="Обратная связь"
				text="Ответы на вопросы по теории и объяснение непонятных моментов."
				bottomElement={<DateSticker>Осенью 2024-го</DateSticker>}
				ghost
			/>
		</section>
	)
}*/

// export default FeaturesGridOne

/*type CellProps = {
	// Header of the cell
	header: string
	// Text content of the cell
	text: string
	// Element in the text content
	elemInText?: ReactNode
	// Element in the bottom
	bottomElement?: ReactNode
	// Should the cell be half transparent
	ghost?: boolean
	// Should the cell have double size
	doubleWidth?: boolean
}*/

/*function Cell(props: CellProps) {
	const { header, text, elemInText, bottomElement, ghost, doubleWidth } = props

	return (
		<div className={cn(s.cell, ghost && s.cellGhost, doubleWidth && s.cellDouble)}>
			<MainPageHeader tag="h3">{header}</MainPageHeader>
			<div className={s.cellTextContent}>
				<div className={s.cellText}>
					<div className={s.cellElemInText}>{elemInText}</div>
					{text}
				</div>
				<div className={s.cellBottomElem}>{bottomElement}</div>
			</div>
		</div>
	)
}*/
