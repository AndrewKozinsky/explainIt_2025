import React from 'react'
import Paragraph from 'ui/Paragraph/Paragraph'
import MainPageBlockWrapper from '../MainPageBlockWrapper/MainPageBlockWrapper'
import './ReadAnyBookBlock.scss'

function ReadAnyBookBlock() {
	return (
		<MainPageBlockWrapper header='Читайте любые книги на английском языке'>
			<Paragraph fontSize={20}>
				Уже прямо сейчас вы можете читать 2 книги: Волшебник Изумрудного города и Копи царя Соломона. Но если
				хочется прочесть другую книгу, то добавь её за 3 шага:
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
