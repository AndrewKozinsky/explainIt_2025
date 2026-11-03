import Faq from '@/shared/ui/FAQ/FAQ'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
import { useMainPageFaqConfig } from './fn/useMainPageFaqConfig'
import './MainPageFaq.scss'

/** Обёртка для компонента вопросов и ответов главной страницы */
function MainPageFaq() {
	const { header, config } = useMainPageFaqConfig()

	return (
		<div className='main-page-faq'>
			<div className='main-page-faq__content'>
				<MainPageHeader text={header} extraClass='main-page-faq__header' />
				<Faq config={config} />
			</div>
		</div>
	)
}

export default MainPageFaq
