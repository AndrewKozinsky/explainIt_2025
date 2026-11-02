import { useTranslations } from 'next-intl'
import StepCard from '../StepCard/StepCard'
import StepCardText from '../StepCard/StepCardText'
import './HintStep.scss'

type Replacement = {
	// Что сказал пользователь
	source: string
	// Как это звучит правильно
	target: string
	// Пояснение к замене
	note?: string
}

/** Шаг 2: помощник показывает правильную фразу и что в ней поменялось */
function HintStep() {
	const t = useTranslations('mainPageAnyLevel')
	const replacements = t.raw('hint.replacements') as Replacement[]

	return (
		<StepCard number='02' title={t('hint.title')}>
			<StepCardText extraClass='any-level-hint-step'>
				<p className='any-level-hint-step__phrase' lang={t('learnedLang')}>
					{t('hint.phrase')}
				</p>
				<dl className='any-level-hint-step__replacements'>
					{replacements.map((replacement) => (
						<div className='any-level-hint-step__replacement' key={replacement.source}>
							<dt>{replacement.source}</dt>
							<dd className='any-level-hint-step__replacement-target'>
								<span className='any-level-hint-step__arrow' aria-hidden='true'>
									→
								</span>
								<span>
									<b className='any-level-hint-step__target' lang={t('learnedLang')}>
										{replacement.target}
									</b>
									{replacement.note && ': ' + replacement.note}
								</span>
							</dd>
						</div>
					))}
				</dl>
				<p className='any-level-hint-step__text'>{t('hint.text')}</p>
			</StepCardText>
		</StepCard>
	)
}

export default HintStep
