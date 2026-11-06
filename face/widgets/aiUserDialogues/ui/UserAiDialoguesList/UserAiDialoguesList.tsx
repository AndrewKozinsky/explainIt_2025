'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import DeleteEntityModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityModal'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import LargeDialogueCard from '../LargeDialogueCard/LargeDialogueCard'
import MediumDialogueCard from '../MediumDialogueCard/MediumDialogueCard'
import { useAiDialogueDelete } from './fn/useAiDialogueDelete'
import { useUserAiDialogues } from './fn/useUserAiDialogues'
import './UserAiDialoguesList.scss'

type Props = { userId: number }

export default function UserAiDialoguesList({ userId }: Props) {
	const t = useTranslations('userAiDialogues')
	const locale = useLocale()
	const query = useUserAiDialogues(userId)
	const { isModalOpen, status, openDeleteModal, closeDeleteModal, onConfirmDelete } = useAiDialogueDelete()

	if (query.isPending) return <p role='status'>{t('loading')}</p>

	if (query.isError && !query.data) {
		return (
			<div role='alert' className='user-ai-dialogues-list__error'>
				<p>{t('loadError')}</p>
				<Button onClick={() => void query.refetch()}>{t('retry')}</Button>
			</div>
		)
	}

	if (!query.dialogues.length) {
		return <p className='user-ai-dialogues-list__empty'>{t('empty')}</p>
	}

	const cards = query.dialogues.map((dialogue, index) => {
		const Card = index === 0 ? LargeDialogueCard : MediumDialogueCard

		return <Card dialogue={dialogue} locale={locale} onDelete={openDeleteModal} key={dialogue.id} />
	})

	return (
		<div className='user-ai-dialogues-list'>
			<div className='user-ai-dialogues-list__cards'>{cards}</div>
			{query.isError && (
				<p role='alert' className='user-ai-dialogues-list__error'>
					{t('refreshError')}
				</p>
			)}
			{query.hasMore && (
				<div className='user-ai-dialogues-list__more'>
					<Button
						theme='outline'
						onClick={() => void query.loadMore()}
						disabled={query.isFetching}
						loading={query.isFetchingNextPage}
					>
						{t('loadMore')}
					</Button>
				</div>
			)}
			<DeleteEntityModal
				isModalOpen={isModalOpen}
				closeModal={closeDeleteModal}
				onDeleteButtonClick={onConfirmDelete}
				isDeleteButtonLoading={status === 'loading'}
				modal={{
					header: t('deleteModal.header'),
					content: t('deleteModal.content'),
					confirmButtonText: t('deleteModal.confirm'),
				}}
			/>
		</div>
	)
}
