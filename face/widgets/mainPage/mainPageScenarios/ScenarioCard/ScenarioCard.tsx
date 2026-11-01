import { useTranslations } from 'next-intl'
import { TurnRightArrowIcon } from '@/shared/ui/icons/mainPage/TurnRightArrowIcon'
import { ScenarioConfig } from '../MainPageScenarios/fn/scenarioConfigs'
import './ScenarioCard.scss'

type ScenarioCardProps = {
	config: ScenarioConfig
}

/** Сценарий: что вы делаете, как отвечает персонаж и к чему это приводит */
function ScenarioCard(props: ScenarioCardProps) {
	const { id, Icon, imagePath } = props.config

	const t = useTranslations(`mainPageScenarios.scenarios.${id}`)
	const lines = t.raw('lines') as string[]

	return (
		<article className='scenario-card'>
			<div className='scenario-card__main'>
				<h3 className='scenario-card__header'>
					<span className='scenario-card__icon-wrapper'>
						<Icon />
					</span>
					{t('title')}
				</h3>
				<p className='scenario-card__text'>{t('text')}</p>
				{/* Реплики всегда на изучаемом языке */}
				<blockquote className='scenario-card__lines' lang='en'>
					{lines.map((line) => (
						<p className='scenario-card__line' key={line}>
							— {line}
						</p>
					))}
				</blockquote>
				<p className='scenario-card__result'>
					<TurnRightArrowIcon extraClass='scenario-card__result-icon' />
					{t('result')}
				</p>
			</div>
			{/* Иллюстрация с подписью: на узких экранах скрыта целиком */}
			<figure className='scenario-card__figure'>
				<div className='scenario-card__image-wrapper'>
					<img
						className='scenario-card__image'
						src={imagePath}
						// Иллюстрации подготовлены для ретины, поэтому показываются вдвое меньше своего размера
						srcSet={imagePath + ' 2x'}
						alt={t('alt')}
						loading='lazy'
					/>
				</div>
				<figcaption className='scenario-card__caption'>{t('caption')}</figcaption>
			</figure>
		</article>
	)
}

export default ScenarioCard
