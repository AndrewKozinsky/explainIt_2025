import React from 'react'

/**
 * Если в поле ввода ответа нажали Enter, то проигнорировать установку новой строки.
 * Кроме того запускается функция показывающая разбор предложения.
 * @param e — объект события
 * @param checkTranslation — функция показывающая разбор предложения
 */
export function onEnterKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>, checkTranslation: () => void) {
	if (e.key === 'Enter') {
		e.preventDefault()
		checkTranslation()
	}
}
