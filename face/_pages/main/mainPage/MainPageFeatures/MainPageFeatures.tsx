import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import './MainPageFeatures.scss'

function MainPageFeatures() {
	return (
		<div className='main-page-features'>
			<div className='main-page-features__cell'>
				<h3 className='main-page-features__cell-header'>Понимание без словаря</h3>
				<p className='main-page-features__cell-text'>
					Получайте перевод любого предложения одним нажатием. Понимание приходит сразу — без потери ритма
					чтения.
				</p>
			</div>
			<div className='main-page-features__cell'>
				<h3 className='main-page-features__cell-header'>Слова в живом контексте</h3>
				<p className='main-page-features__cell-text'>
					Слова запоминаются естественно, потому что вы видите их в реальных ситуациях, а не в списке.
				</p>
			</div>
			<div className='main-page-features__cell'>
				<h3 className='main-page-features__cell-header'>Грамматика без заучивания</h3>
				<p className='main-page-features__cell-text'>
					Грамматика усваивается через примеры. Так же, как вы когда-то освоили родной язык.
				</p>
			</div>
			<div className='main-page-features__cell'>
				<p className='main-page-features__big-text'>
					Чтение перестаёт быть борьбой с каждым предложением и испытанием воли, а превращается в
					увлекательное и полезное занятие. А значит, появляется главное — желание продолжать.
				</p>
			</div>
			<img
				className='main-page-features__illustration'
				src={publicFolderFilesUrls.mainPage.girlOnArmchair}
				alt='Girl on armchear'
			/>
			<div className='main-page-features__cell'>
				<h3 className='main-page-features__cell-header'>Интервальное повторение</h3>
				<p className='main-page-features__cell-text'>
					При чтении книг это происходит естественным образом. Поэтому даже если вы не запомнили с первого
					раза, то с каждой прочитанной главой вероятность возрастает.
				</p>
			</div>
			<div className='main-page-features__cell'>
				<h3 className='main-page-features__cell-header'>Всё в одном приложении</h3>
				<p className='main-page-features__cell-text'>
					Всё помещено в одном окне. Вам не потребуется копировать слова и переносить в другое приложение.
					Просто указываете слово и программа показывает перевод.
				</p>
			</div>
			<div className='main-page-features__any-devices-cell'>
				<p>Программа адаптирована для любых устройств с современным браузером и интернетом.</p>
				<img src={publicFolderFilesUrls.mainPage.anyDevices} alt='Any divices' />
			</div>
		</div>
	)
}

export default MainPageFeatures
