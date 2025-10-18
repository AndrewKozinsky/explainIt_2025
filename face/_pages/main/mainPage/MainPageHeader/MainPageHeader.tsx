import React from 'react'
import Header from 'ui/Header/Header'
import './MainPageHeader.scss'

function MainPageHeader() {
	return (
		<div className='main-page-header'>
			<Header hStyle={1}>Читайте книги на иностранном языке — с умным переводом и объяснением от ИИ</Header>
			<div className='main-page-header__description'>
				<p className='main-page-header__description-text'>Понимайте смысл каждой фразы</p>
				<p className='main-page-header__description-text'>Изучайте слова в контексте</p>
				<p className='main-page-header__description-text'>Осваивайте грамматику в процессе</p>
			</div>
		</div>
	)
}

export default MainPageHeader
