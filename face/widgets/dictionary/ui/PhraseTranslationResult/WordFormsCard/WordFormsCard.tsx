import { useTranslations } from 'next-intl'
import type { WordFormsModel } from '@/entities/universalPhrase/repository/PhraseTranslationRepository'
import { ActionIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionIcon'
import WordForm from '../WordForm/WordForm'
import './WordFormsCard.scss'

type WordFormsCardProps = {
	wordForms: WordFormsModel
	lookedUpText: string
}

/** Формы слова: подпись вида и формы через стрелки. */
function WordFormsCard(props: WordFormsCardProps) {
	const { wordForms, lookedUpText } = props
	const t = useTranslations('dictionary')
	const lookedUpForm = lookedUpText.trim().toLowerCase()

	return (
		<div className='translation-word-forms'>
			<p className='translation-word-forms__label'>{t(`wordFormsKind.${wordForms.kind}`)}</p>
			<p className='translation-word-forms__forms'>
				{wordForms.forms.map((form, formIndex) => (
					<span key={formIndex} className='translation-word-forms__part'>
						{formIndex > 0 && <ActionIcon extraClass='translation-word-forms__arrow' />}
						<WordForm form={form} lookedUpForm={lookedUpForm} />
					</span>
				))}
			</p>
		</div>
	)
}

export default WordFormsCard
