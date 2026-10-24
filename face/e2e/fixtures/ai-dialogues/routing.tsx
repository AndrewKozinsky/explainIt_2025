import React, { type AnchorHTMLAttributes } from 'react'

/** Изолированный стенд: маршруты Next не монтируются, ссылки сохраняют локаль приложения. */
export function Link({
	href,
	prefetch: _prefetch,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean }) {
	return <a href={`/ru${href}`} {...props} />
}
