import React from 'react'

/**
 * Если в поле ввода ответа нажали Enter, то проигнорировать установку новой строки.
 * Кроме того это пускает событие выше чтобы его поймал обработчик onKeyDown
 * в котором запускается функция показывающая разбор предложения.
 * @param e
 */
export function onEnterKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
	if (e.key === 'Enter') e.preventDefault()
}
