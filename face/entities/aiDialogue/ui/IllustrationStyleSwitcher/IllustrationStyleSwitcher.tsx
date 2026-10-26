import { useId, useState } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import LabelWithField from '@/shared/ui/formRelated/LabelWithField/LabelWithField'
import type { AiDialogueIllustrationStyleModel } from '../../types/aiDialogueIllustrationStyles'
import './IllustrationStyleSwitcher.scss'

type Props = {
	styles: AiDialogueIllustrationStyleModel[]
	selectedStyleId: string | null
	onChange: (styleId: string) => void
	disabled: boolean
	isPending: boolean
	isError: boolean
	isFetching: boolean
	onRetry: () => void
}

export default function IllustrationStyleSwitcher(props: Props) {
	const { styles, selectedStyleId, onChange, disabled, isPending, isError, isFetching, onRetry } = props
	const t = useTranslations('aiDialogue.illustrationStyleSelector')
	const groupName = useId()

	return (
		<LabelWithField label={t('label')} disabled={disabled}>
			{isPending && <p role='status'>{t('loading')}</p>}
			{!isPending && (isError || !styles.length) && (
				<div className='illustration-style-switcher__error'>
					<p role='alert'>{t(isError ? 'error' : 'empty')}</p>
					<Button onClick={onRetry} disabled={disabled || isFetching}>
						{t('retry')}
					</Button>
				</div>
			)}
			<div
				className='illustration-style-switcher__options'
				role='radiogroup'
				aria-label={t('label')}
				aria-disabled={disabled}
			>
				{styles.map((style) => (
					<IllustrationStyleOption
						key={style.id}
						style={style}
						groupName={groupName}
						checked={style.id === selectedStyleId}
						onChange={() => onChange(style.id)}
						disabled={disabled}
					/>
				))}
			</div>
		</LabelWithField>
	)
}

function IllustrationStyleOption({
	style,
	groupName,
	checked,
	onChange,
	disabled,
}: {
	style: AiDialogueIllustrationStyleModel
	groupName: string
	checked: boolean
	onChange: () => void
	disabled: boolean
}) {
	const t = useTranslations()
	const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(null)
	const title = t.has(style.titleKey) ? t(style.titleKey) : style.id

	return (
		<label className='illustration-style-switcher__option'>
			<input
				className='illustration-style-switcher__input'
				type='radio'
				name={groupName}
				value={style.id}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<span className='illustration-style-switcher__preview'>
				{failedPreviewUrl !== style.previewUrl && (
					<img src={style.previewUrl} alt='' onError={() => setFailedPreviewUrl(style.previewUrl)} />
				)}
			</span>
			<span className='illustration-style-switcher__title'>{title}</span>
		</label>
	)
}
