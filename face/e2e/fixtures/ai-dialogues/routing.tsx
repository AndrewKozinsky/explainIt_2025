import React, { type AnchorHTMLAttributes } from 'react'

/** Изолированный стенд: маршруты Next не монтируются, ссылки сохраняют локаль приложения. */
export function Link({
	href,
	prefetch: _prefetch,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) {
	return <a href={`/ru${href}`} {...props} />
}

const router = { push: (path: string) => window.history.pushState(null, '', `/ru${path}`) }

/** Проверяем адрес перехода без запуска страницы диалога и генерации сообщений. */
export function useRouter() {
	return router
}
