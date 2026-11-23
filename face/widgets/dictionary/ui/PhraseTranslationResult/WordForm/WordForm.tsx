import { Fragment } from 'react'
import type { LanguageCode } from '@/shared/utils/languages'
import './WordForm.scss'

type WordFormProps = {
	/** Форма из справочника; варианты разделены косой чертой: learned/learnt */
	form: string
	lookedUpForm: string
	languageCode: LanguageCode
}

const optionalPrefixes: Partial<Record<LanguageCode, RegExp>> = {
	de: /^(?:der|die|das|hat|ist|am) /,
	es: /^(?:el|la|los|las) /,
	fr: /^(?:(?:un|une|des|le|je) |j')/,
	it: /^(?:(?:il|lo|la|i|gli|le|ho|sono) |l')/,
}

export function normalizeWordFormText(text: string, languageCode: LanguageCode): string {
	const normalized = text
		.normalize('NFC')
		.toLocaleLowerCase(languageCode)
		.replace(/[‘’ʼ`´]/g, '\u0027')
		.replace(/^(?:(?!')[\p{P}\s])+|(?:(?!')[\p{P}\s])+$/gu, '')
		.replace(/\s+/g, ' ')
	return languageCode === 'tr' ? normalized.replace(/i\u0307/g, 'i') : normalized
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
				const normalizedVariant = normalizeWordFormText(variant, languageCode)
				const prefix = optionalPrefixes[languageCode]
				const isCurrent =
					normalizedVariant === lookedUpForm ||
					(prefix && normalizedVariant.replace(prefix, '') === lookedUpForm) ||
					(languageCode === 'ru' && normalizedVariant.replace(/ё/g, 'е') === lookedUpForm) ||
					(languageCode === 'tr' && normalizedVariant.replace(/ı/g, 'i') === lookedUpForm.replace(/ı/g, 'i'))

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
