'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import DeleteEntityModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityModal'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import StatusBlock from '@/shared/ui/InfoBlock/StatusBlock'
import AiDialogueCard from '../AiDialogueCard/AiDialogueCard'
import { useAiDialogueDelete } from './fn/useAiDialogueDelete'
import { useUserAiDialogues } from './fn/useUserAiDialogues'
import AiDialoguesEmpty from './ui/AiDialoguesEmpty/AiDialoguesEmpty'
import AiDialoguesLoadError from './ui/AiDialoguesLoadError/AiDialoguesLoadError'
import AiDialoguesLoading from './ui/AiDialoguesLoading/AiDialoguesLoading'
import './UserAiDialoguesList.scss'

type Props = { userId: number }

export default function UserAiDialoguesList({ userId }: Props) {
	const t = useTranslations('userAiDialogues')
	const locale = useLocale()
	const query = useUserAiDialogues(userId)
	const { isModalOpen, status, openDeleteModal, closeDeleteModal, onConfirmDelete } = useAiDialogueDelete()

	if (query.isPending) return <AiDialoguesLoading />

	if (query.isError && !query.data) return <AiDialoguesLoadError onRetry={() => void query.refetch()} />

	if (!query.dialogues.length) return <AiDialoguesEmpty />

	const cards = query.dialogues.map((dialogue) => (
		<AiDialogueCard dialogue={dialogue} locale={locale} onDelete={openDeleteModal} key={dialogue.id} />
	))

	return (
		<div className='user-ai-dialogues-list'>
			<div className='user-ai-dialogues-list__cards'>{cards}</div>
			{query.isError && (
				<div role='alert'>
					<StatusBlock type='error'>{t('refreshError')}</StatusBlock>
				</div>
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
