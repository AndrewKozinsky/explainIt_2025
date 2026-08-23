// 'use client'

// import { useCallback, useContext, useMemo } from 'react'
// import { redirect } from 'next/navigation'
// import { useLocale } from 'next-intl'
// import { booksService, BooksService } from '@/entities/book/BooksService'
// import { BooksApi } from '@/entities/book/repository/BooksApi'
// import type { BookModel } from '@/entities/book/repository/BooksRepository'
// import { useRouter } from '@/i18n/routing'
// import { useUser } from '@/shared/api/auth/UserProvider'
// import { NotificationContext } from '@/shared/ui/Notification/fn/context'
// import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
// import { pageUrls, localizePath } from '@/shared/utils/pageUrls'

/**
 * Хук для создания новой приватной книги.
 *
 * Возвращает асинхронную функцию-обработчик, которая:
 * 1. Проверяет авторизацию (редирект на логин если не залогинен)
 * 2. Вызывает {@link BooksService.createBook}
 * 3. Показывает уведомление при ошибке
 * 4. Редиректит на страницу редактирования при успехе
 *
 * @returns `() => Promise<ApiResult<Book>>` — обработчик для {@link MediaGridAddButton}
 */
/*export function useGetAddBook(): () => Promise<ApiResult<BookModel>> {
	const router = useRouter()
	const { notify } = useContext(NotificationContext)
	const user = useUser()
	const locale = useLocale()

	const handleAdd = useCallback(
		async function (): Promise<ApiResult<BookModel>> {
			if (!user) {
				redirect(localizePath(locale, pageUrls.auth.login.path))
			}

			const result = await booksService.createBook({
				name: null,
				author: null,
				about: null,
				languageCode: 'en',
			})

			if (result.error) {
				notify({ type: 'error', message: result.error })
				return result
			}

			if (result.errors && result.errors.length > 0) {
				const text = result.errors.map((e) => `${e.field}: ${e.messages.join(', ')}`).join('; ')
				notify({ type: 'error', message: text })

				return result
			}

			if (result.data) {
				router.push(pageUrls.books.book(result.data.id).path)
			}

			return result
		},
		[booksService, user, locale, notify, router],
	)

	return handleAdd
}*/
