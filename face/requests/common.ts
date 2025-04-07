import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

type TData = any
type TError = any
type TVariables = any
type TContext = any

export type MutationOptions = UseMutationOptions<TData, TError, TVariables, TContext>

// Короткая запись для указания типа данные возвращаемых запросов для типизации QueryOptions
export type QueryOptions<T> = UseQueryOptions<AxiosResponse<T>>
