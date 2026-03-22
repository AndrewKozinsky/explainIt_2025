import './TariffRules.scss'

function TariffRules() {
	return (
		<div className='tariff-rules'>
			<h3 className='tariff-rules__header'>После окончания подписки</h3>
			<div className='tariff-rules__content'>
				<p className='tariff-rules__paragraph'>Вы переходите на бесплатный тариф.</p>
				<p className='tariff-rules__paragraph'>Автоматических продлений и списаний нет.</p>
				<p className='tariff-rules__paragraph'>Загруженные книги и фильмы остаются в учётной записи.</p>
				<p className='tariff-rules__paragraph'>
					Вы можете открывать загруженные книги и смотреть видео, смотреть уже сделанные переводы. Но
					недоступно создание новых переводов.
				</p>
				<p className='tariff-rules__paragraph'>
					Если вы пользовались «Стандартным» тарифом, то видео-файлы хранятся 30 дней, после чего удаляются.
				</p>
			</div>
		</div>
	)
}

export default TariffRules
