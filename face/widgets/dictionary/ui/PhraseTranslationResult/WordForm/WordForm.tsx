import { Fragment } from 'react'
import type { LanguageCode } from '@/shared/utils/languages'
import './WordForm.scss'

type WordFormProps = {
	/** Форма из справочника; варианты разделены косой чертой: learned/learnt */
	form: string
	lookedUpForm: string
	languageCode: LanguageCode
}

/**
 * Одна форма слова. Искомый вариант выделяется акцентным цветом;
 * у brought это и вторая, и третья форма, потому что без контекста их не различить.
 */
function WordForm(props: WordFormProps) {
	const { form, lookedUpForm, languageCode } = props

	return (
		<span className='word-form'>
			{form.split('/').map((variant, variantIndex) => {
				const normalizedVariant = variant.toLowerCase()
				const isCurrent =
					normalizedVariant === lookedUpForm ||
					(languageCode === 'de' &&
						normalizedVariant.replace(/^(?:der|die|das|hat|ist|am) /, '') === lookedUpForm)
				return (
					<Fragment key={variant}>
						{variantIndex > 0 && ' / '}
						<span
							className={
								isCurrent ? 'word-form__variant word-form__variant--current' : 'word-form__variant'
							}
						>
							{variant}
						</span>
					</Fragment>
				)
			})}
		</span>
	)
}

export default WordForm
