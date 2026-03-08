import React from 'react'
import './TariffRules.scss'

function TariffRules() {
	return (
		<div className='tariff-rules'>
			<h3 className='tariff-rules__header'>После окончания подписки</h3>
			<div className='tariff-rules__content'>
				<div className='tariff-rules__text-block tariff-rules__text-block--left'>
					<p className='tariff-rules__paragraph'>Вы переходите на бесплатный тариф.</p>
					<p className='tariff-rules__paragraph'>Автоматических продлений и списаний нет.</p>
				</div>
				<div className='tariff-rules__text-block tariff-rules__text-block--right'>
					<p className='tariff-rules__paragraph'>Если вы пользовались «Стандартным» тарифом:</p>
					<p className='tariff-rules__paragraph'>
						— Загруженные книги остаются в учётной записи.
						<br />
						— Субтитры и переводы видео сохраняются.
						<br />— Видео-файлы хранятся 30 дней, после чего удаляются.
					</p>
					<p className='tariff-rules__paragraph'>
						После окончания срока тарифа переходите на бесплатный тариф. Вы можете открывать свои
						загруженные книги и материалы, смотреть уже сделанные переводы предложений, но создание новых
						переводов и разборов становится недоступным.
					</p>
					<p className='tariff-rules__paragraph'>
						Вернуться к полному функционалу можно в любой момент — просто оформите подписку и загрузите
						файлы снова если уже были удалены.
					</p>
				</div>
			</div>
		</div>
	)
}

export default TariffRules
