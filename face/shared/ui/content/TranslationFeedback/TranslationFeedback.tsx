import type { ComponentPropsWithoutRef } from 'react'
import cn from 'classnames'
import './TranslationFeedback.scss'

export default function TranslationFeedback({ className, ...props }: ComponentPropsWithoutRef<'ol'>) {
	return <ol role='list' {...props} className={cn('translation-feedback', className)} />
}
