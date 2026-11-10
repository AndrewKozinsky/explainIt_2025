import { Fragment } from 'react'
import './WordForm.scss'

type WordFormProps = {
	/** Форма из справочника; варианты разделены косой чертой: learned/learnt */
	form: string
	lookedUpForm: string
}

/**
 * Одна форма слова. Искомый вариант выделяется акцентным цветом;
 * у brought это и вторая, и третья форма, потому что без контекста их не различить.
 */
function WordForm(props: WordFormProps) {
	const { form, lookedUpForm } = props

	return (
		<span className='word-form'>
			{form.split('/').map((variant, variantIndex) => (
				<Fragment key={variant}>
					{variantIndex > 0 && ' / '}
					<span
						className={
							variant === lookedUpForm
								? 'word-form__variant word-form__variant--current'
								: 'word-form__variant'
						}
					>
						{variant}
					</span>
				</Fragment>
			))}
		</span>
	)
}

export default WordForm
