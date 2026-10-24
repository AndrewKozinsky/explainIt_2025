'use client'

import { useState } from 'react'
import cn from 'classnames'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { Link } from '@/i18n/routing'
import CharacterAvatars from '@/shared/ui/CharacterAvatars/CharacterAvatars'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import { ActionButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/ActionButtonIcon'
import { TrashButtonIcon } from '@/shared/ui/icons/buttonIcons/standard/TrashButtonIcon'
import { pageUrls } from '@/shared/utils/pageUrls'
import { pickLocalized } from '@/shared/utils/pickLocalized'
import { formatDialogueDate } from '../fn/formatDialogueDate'

type Props = {
	dialogue: AiDialogueListItemModel
	featured: boolean
	locale: string
	onDelete: (id: number) => void
}

export default function DialogueCard({ dialogue, featured, locale, onDelete }: Props) {
	const title = pickLocalized(dialogue.scenario.title, locale) || 'Диалог'
	const url = pageUrls.aiDialogues.dialog(dialogue.id).path

	const characters = dialogue.characters.map((character) => ({
		id: character.npcId,
		name: [character.name, character.role].filter(Boolean).join(' • ') || 'Персонаж',
		image: character.emotionSheet,
	}))

	return (
		<article className={cn('ai-dialogue-card', featured && 'ai-dialogue-card--featured')}>
			<SceneImage url={dialogue.sceneImage?.url} title={title} />
			<DialogueSummary dialogue={dialogue} featured={featured} locale={locale} title={title} url={url} />
			<div className='ai-dialogue-card__characters'>
				<CharacterAvatars
					characters={characters}
					size={featured ? 'small' : 'medium'}
					maxVisible={featured ? 8 : 3}
				/>
			</div>
			<LastMessage message={dialogue.lastMessage} />
			<BaseButton
				theme='plain'
				extraClass='ai-dialogue-card__delete'
				title='Удалить диалог'
				aria-label={`Удалить диалог «${title}»`}
				onClick={() => onDelete(dialogue.id)}
			>
				<TrashButtonIcon />
			</BaseButton>
			<BaseButton
				href={url}
				theme={featured ? 'accent' : 'regular'}
				extraClass='ai-dialogue-card__reply'
				aria-label={`Ответить в диалоге «${title}»`}
			>
				<ActionButtonIcon /> Ответить
			</BaseButton>
		</article>
	)
}

function DialogueSummary({
	dialogue,
	featured,
	locale,
	title,
	url,
}: Omit<Props, 'onDelete'> & { title: string; url: string }) {
	const language =
		new Intl.DisplayNames([locale], { type: 'language' }).of(dialogue.sourceLanguageCode) ??
		dialogue.sourceLanguageCode
	const languageName = language.charAt(0).toLocaleUpperCase(locale) + language.slice(1)
	return (
		<div className='ai-dialogue-card__summary'>
			{featured && <p className='ai-dialogue-card__label'>Последний диалог</p>}
			<h4 className='ai-dialogue-card__title'>
				<Link href={url} prefetch={false}>
					{title}
				</Link>
			</h4>
			<p className='ai-dialogue-card__meta'>
				<span className='ai-dialogue-card__language'>{languageName}</span>
				<span>{dialogue.maxCefrLevel ?? 'Без ограничения'}</span>
				<DialogueTime message={dialogue.lastMessage} locale={locale} />
			</p>
		</div>
	)
}

function DialogueTime({ message, locale }: { message: AiDialogueListItemModel['lastMessage']; locale: string }) {
	if (!message) return null
	const date = formatDialogueDate(message.createdAt, locale)
	if (!date) return null
	return (
		<time dateTime={message.createdAt} title={new Date(message.createdAt).toLocaleString(locale)}>
			{date}
		</time>
	)
}

function LastMessage({ message }: { message: AiDialogueListItemModel['lastMessage'] }) {
	if (!message)
		return <p className='ai-dialogue-card__message ai-dialogue-card__no-message'>Пока нет сообщений персонажей.</p>
	return (
		<div className='ai-dialogue-card__message'>
			<p className='ai-dialogue-card__speaker'>
				{message.name || 'Персонаж'}
				{message.role && <span> • {message.role}</span>}
			</p>
			<p
				className={cn(
					'ai-dialogue-card__text',
					message.textType === 'action' && 'ai-dialogue-card__text--action',
				)}
				title={message.text}
			>
				{message.text}
			</p>
		</div>
	)
}

function SceneImage({ url, title }: { url?: string; title: string }) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)
	return (
		<div className='ai-dialogue-card__scene'>
			{url && url !== failedUrl && (
				<img src={url} alt={`Сцена диалога «${title}»`} loading='lazy' onError={() => setFailedUrl(url)} />
			)}
		</div>
	)
}
