import { useTranslations } from 'next-intl'
import type { WordFormsKind, WordFormsModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import { ActionIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionIcon'
import type { LanguageCode } from '@/shared/utils/languages'
import WordForm, { normalizeWordFormText } from '../WordForm/WordForm'
import './WordFormsCard.scss'

type WordFormsCardProps = {
	wordForms: WordFormsModel
	lookedUpText: string
	languageCode: LanguageCode
}

const formLabelsByLanguage: Partial<Record<LanguageCode, Partial<Record<WordFormsKind, readonly string[]>>>> = {
	es: { irregularVerb: ['infinitive', 'presentFirst', 'pastFirst', 'participle'] },
	fr: { irregularVerb: ['infinitive', 'presentFirst', 'participle'] },
	it: { irregularVerb: ['infinitive', 'presentFirst', 'compoundPastFirst'] },
	ru: {
		irregularVerb: ['infinitive', 'presentFirst', 'presentSecond', 'past'],
		plural: ['singular', 'plural', 'genitivePlural'],
	},
	tr: {
		irregularVerb: ['infinitive', 'presentThird', 'aoristThird', 'pastThird'],
		stemChange: ['nominative', 'accusative', 'dative'],
	},
}

/** Формы слова: подпись вида и формы через стрелки. */
function WordFormsCard(props: WordFormsCardProps) {
	const { wordForms, lookedUpText, languageCode } = props
	const t = useTranslations('dictionary')
	const lookedUpForm = normalizeWordFormText(lookedUpText, languageCode)
	const labels = formLabelsByLanguage[languageCode]?.[wordForms.kind]

	return (
		<div className='translation-word-forms'>
			<p className='translation-word-forms__label'>{t(`wordFormsKind.${wordForms.kind}`)}</p>
			<p className='translation-word-forms__forms'>
				{wordForms.forms.map((form, formIndex) => {
					const label = labels?.[formIndex]

					return (
						<span key={formIndex} className='translation-word-forms__part'>
							{formIndex > 0 && <ActionIcon extraClass='translation-word-forms__arrow' />}
							<span className='translation-word-forms__item'>
								<WordForm form={form} lookedUpForm={lookedUpForm} languageCode={languageCode} />
								{label && (
									<span className='translation-word-forms__item-label'>
										{t(`wordFormLabels.${label}`)}
									</span>
								)}
							</span>
						</span>
					)
				})}
			</p>
		</div>
	)
}

export default WordFormsCard
