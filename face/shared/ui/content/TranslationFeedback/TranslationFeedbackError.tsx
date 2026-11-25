import type { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'
import './TranslationFeedback.scss'

type TranslationFeedbackErrorProps = Omit<ComponentPropsWithoutRef<'li'>, 'children'> & {
	fragment: string
	replacement?: string | null
	explanation?: string | null
	number?: number
}

export default function TranslationFeedbackError({
	fragment,
	replacement,
	explanation,
	number,
	className,
	...props
}: TranslationFeedbackErrorProps) {
	return (
		<li role='listitem' {...props} className={cn('translation-feedback__issue', className)}>
			{number !== undefined && (
				<span className='translation-feedback__number' aria-hidden='true'>
					{String(number).padStart(2, '0')}
				</span>
			)}
			<div className='translation-feedback__issue-content'>
				<p className='translation-feedback__correction'>
					{replacement ? (
						<>
							<s>{fragment}</s>{' '}
							<span className='translation-feedback__arrow-circle' aria-hidden='true'>
								<span className='translation-feedback__arrow'>→</span>
							</span>
							{'\u00a0'}
							<strong>{replacement}</strong>
						</>
					) : (
						fragment
					)}
				</p>
				{explanation && <StyledMarkdown className='translation-feedback__explanation' content={explanation} />}
			</div>
		</li>
	)
}
