import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import MainPageBlockWrapper from '../MainPageBlockWrapper/MainPageBlockWrapper'
import './ReadAnyBookBlock.scss'

function ReadAnyBookBlock() {
	return (
		<MainPageBlockWrapper header='Читайте любую книгу, на любом языке'>
			<Paragraph fontSize={20}>
				Мы не ограничиваем вас библиотекой готовых текстов. Хотите — Гарри Поттера на английском, Сто лет
				одиночества на испанском или Мастера и Маргариту на французском. Всё просто:
			</Paragraph>
			<div className='read-any-book__steps'>
				<Paragraph fontSize={20}>1. Найдите текст книги в интернете.</Paragraph>
				<Paragraph fontSize={20}>2. Создайте книгу и главы.</Paragraph>
				<Paragraph fontSize={20}>3. Начинайте читать!</Paragraph>
			</div>
			<img src='/mainPage/books.jpg' className='read-any-book__books' alt='Book examples' />
		</MainPageBlockWrapper>
	)
}

export default ReadAnyBookBlock
