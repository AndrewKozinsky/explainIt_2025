'use client'

import React from 'react'
import { useLocale } from 'next-intl'
import DeleteEntityModal from '@/shared/ui/DeleteEntityButtonAndModal/DeleteEntityModal'
import Divider from '@/shared/ui/Divider/Divider'
import Button from '@/shared/ui/formRelated/buttons/Button/Button'
import LargeDialogueCard from '../LargeDialogueCard/LargeDialogueCard'
import MediumDialogueCard from '../MediumDialogueCard/MediumDialogueCard'
import { useAiDialogueDelete } from './fn/useAiDialogueDelete'
import { useUserAiDialogues } from './fn/useUserAiDialogues'
import './UserAiDialoguesList.scss'

type Props = { userId: number }

export default function UserAiDialoguesList({ userId }: Props) {
	const locale = useLocale()
	const query = useUserAiDialogues(userId)
	const { isModalOpen, status, openDeleteModal, closeDeleteModal, onConfirmDelete } = useAiDialogueDelete()

	if (query.isPending) return <p role='status'>Загружаю диалоги…</p>

	if (query.isError && !query.data) {
		return (
			<div role='alert' className='user-ai-dialogues-list__error'>
				<p>Не удалось загрузить диалоги.</p>
				<Button onClick={() => void query.refetch()}>Повторить</Button>
			</div>
		)
	}

	if (!query.dialogues.length) {
		return (
			<p className='user-ai-dialogues-list__empty'>
				У вас ещё нет ни одного диалога. Выберите сценарий чтобы начать.
			</p>
		)
	}

	const cards = query.dialogues.map((dialogue, index) => {
		const Card = index === 0 ? LargeDialogueCard : MediumDialogueCard

		return (
			<React.Fragment key={dialogue.id}>
				<Card dialogue={dialogue} locale={locale} onDelete={openDeleteModal} />
				<Divider />
			</React.Fragment>
		)
	})

	return (
		<div className='user-ai-dialogues-list'>
			<div className='user-ai-dialogues-list__cards'>{cards}</div>
			{query.isError && (
				<p role='alert' className='user-ai-dialogues-list__error'>
					Не удалось обновить диалоги. Попробуйте ещё раз.
				</p>
			)}
			{query.hasMore && (
				<div className='user-ai-dialogues-list__more'>
					<Button
						onClick={() => void query.loadMore()}
						disabled={query.isFetching}
						loading={query.isFetchingNextPage}
					>
						Предыдущие диалоги
					</Button>
				</div>
			)}
			<DeleteEntityModal
				isModalOpen={isModalOpen}
				closeModal={closeDeleteModal}
				onDeleteButtonClick={onConfirmDelete}
				isDeleteButtonLoading={status === 'loading'}
				modal={{
					header: 'Удаление диалога',
					content: 'Вы уверены, что хотите удалить диалог?',
					confirmButtonText: 'Удалить диалог',
				}}
			/>
		</div>
	)
}
