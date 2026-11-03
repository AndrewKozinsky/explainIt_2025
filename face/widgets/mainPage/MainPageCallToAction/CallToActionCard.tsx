import cn from 'classnames'
import { useTranslations } from 'next-intl'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import { CircleArrowRightIcon } from '@/shared/ui/icons/mainPage/CircleArrowRightIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import MainPageHeader from '../MainPageHeader/MainPageHeader'
import './MainPageCallToAction.scss'

type CallToActionCardProps = {
	// Раскрыта: с основным текстом и подписью на кнопке. Свёрнута: только заголовок и кнопка, на узком блоке только кнопка
	isExpanded: boolean
	extraClass?: string
}

/** Карточка призыва: тёмная часть с заголовком и текстом, оранжевая кнопка-ссылка на выбор сюжета */
function CallToActionCard(props: CallToActionCardProps) {
	const { isExpanded, extraClass } = props

	const t = useTranslations('mainPageCallToAction')

	return (
		<div className={cn('call-to-action__card', isExpanded && 'call-to-action__card--expanded', extraClass)}>
			{/* Сворачивается целиком только на узком блоке, где кнопка стоит под текстом */}
			<div className='call-to-action__collapse call-to-action__content-collapse'>
				<div className='call-to-action__collapse-inner'>
					<div className='call-to-action__content'>
						<MainPageHeader text={t('header')} extraClass='call-to-action__header' />
						<div className='call-to-action__collapse' inert={!isExpanded}>
							<div className='call-to-action__collapse-inner'>
								<p className='call-to-action__text'>{t('text')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BaseButton theme='accent' href={pageUrls.aiDialogues.path} extraClass='call-to-action__link'>
				<span className='call-to-action__link-texts'>
					<span className='call-to-action__link-text'>{t('button')}</span>
					<span className='call-to-action__collapse' inert={!isExpanded}>
						<span className='call-to-action__collapse-inner'>
							<span className='call-to-action__link-note'>{t('note')}</span>
						</span>
					</span>
				</span>
				<CircleArrowRightIcon extraClass='call-to-action__link-icon' />
			</BaseButton>
		</div>
	)
}

export default CallToActionCard
