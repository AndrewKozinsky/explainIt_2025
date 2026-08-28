import { type Context, createContext, useContext } from 'react'

export const createStrictContext = <T>() => createContext<T | null>(null)

export const useStrictContext = <T>(context: Context<T | null>): T => {
	const value = useContext(context)

	if (value === null) {
		throw new Error('Пустое значение контекста')
	}

	return value
}
