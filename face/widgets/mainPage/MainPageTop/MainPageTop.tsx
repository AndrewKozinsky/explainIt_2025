import BaseButton from '@/shared/ui/BaseButton/BaseButton'
import { RoundArrowWhiteIcon } from '@/shared/ui/icons/RoundArrowWhiteIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import './MainPageTop.scss'

function MainPageTop() {
	return (
		<div className='main-page-top'>
			<h1 className='main-page-top__header'>Читайте и&nbsp;смотрите в&nbsp;оригинале без&nbsp;страха</h1>
			<p className='main-page-top__subheader'>Перевод одним нажатием</p>
			<div className='main-page-top__buttons'>
				<BaseButton
					theme='accent'
					extraClass='main-page-top__button main-page-top__button--accent'
					href={pageUrls.books.book('p1').chapter(1).path}
				>
					<RoundArrowWhiteIcon />
					Попробовать
				</BaseButton>
			</div>
		</div>
	)
}

export default MainPageTop
