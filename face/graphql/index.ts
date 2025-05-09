import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string }
	String: { input: string; output: string }
	Boolean: { input: boolean; output: boolean }
	Int: { input: number; output: number }
	Float: { input: number; output: number }
}

export type CheckTranslationInput = {
	/** Sentence in English */
	engSentence: Scalars['String']['input']
	/** Sentence in Russian */
	rusSentence: Scalars['String']['input']
}

export type CheckTranslationOutErrorModel = {
	__typename?: 'CheckTranslationOutErrorModel'
	error: Scalars['String']['output']
}

export type CheckTranslationOutModel = CheckTranslationOutErrorModel | CheckTranslationOutSuccessModel

export type CheckTranslationOutSuccessModel = {
	__typename?: 'CheckTranslationOutSuccessModel'
	analysis: Scalars['String']['output']
	correct: Scalars['Boolean']['output']
}

export type GetTranscriptionInput = {
	/** Sentence in English */
	engSentence: Scalars['String']['input']
}

export type GetTranscriptionOutErrorModel = {
	__typename?: 'GetTranscriptionOutErrorModel'
	error: Scalars['String']['output']
}

export type GetTranscriptionOutModel = GetTranscriptionOutErrorModel | GetTranscriptionOutSuccessModel

export type GetTranscriptionOutSuccessModel = {
	__typename?: 'GetTranscriptionOutSuccessModel'
	transcription: Scalars['String']['output']
}

export type Query = {
	__typename?: 'Query'
	ai_checkTranslation: CheckTranslationOutModel
	ai_getTranscription: GetTranscriptionOutModel
}

export type QueryAi_CheckTranslationArgs = {
	input: CheckTranslationInput
}

export type QueryAi_GetTranscriptionArgs = {
	input: GetTranscriptionInput
}

export type AiCheckTranslationVariables = Exact<{
	rusSentence: Scalars['String']['input']
	engSentence: Scalars['String']['input']
}>

export type AiCheckTranslation = {
	__typename?: 'Query'
	ai_checkTranslation:
		| { __typename?: 'CheckTranslationOutErrorModel'; error: string }
		| { __typename?: 'CheckTranslationOutSuccessModel'; correct: boolean; analysis: string }
}

export type AiGetTranscriptionVariables = Exact<{
	engSentence: Scalars['String']['input']
}>

export type AiGetTranscription = {
	__typename?: 'Query'
	ai_getTranscription:
		| { __typename?: 'GetTranscriptionOutErrorModel'; error: string }
		| { __typename?: 'GetTranscriptionOutSuccessModel'; transcription: string }
}

export const AiCheckTranslationDocument = gql`
	query AICheckTranslation($rusSentence: String!, $engSentence: String!) {
		ai_checkTranslation(input: { rusSentence: $rusSentence, engSentence: $engSentence }) {
			... on CheckTranslationOutSuccessModel {
				correct
				analysis
			}
			... on CheckTranslationOutErrorModel {
				error
			}
		}
	}
`

/**
 * __useAiCheckTranslation__
 *
 * To run a query within a React component, call `useAiCheckTranslation` and pass it any options that fit your needs.
 * When your component renders, `useAiCheckTranslation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiCheckTranslation({
 *   variables: {
 *      rusSentence: // value for 'rusSentence'
 *      engSentence: // value for 'engSentence'
 *   },
 * });
 */
export function useAiCheckTranslation(
	baseOptions: Apollo.QueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables> &
		({ variables: AiCheckTranslationVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options)
}
export function useAiCheckTranslationLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options)
}
export function useAiCheckTranslationSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options)
}
export type AiCheckTranslationHookResult = ReturnType<typeof useAiCheckTranslation>
export type AiCheckTranslationLazyQueryHookResult = ReturnType<typeof useAiCheckTranslationLazyQuery>
export type AiCheckTranslationSuspenseQueryHookResult = ReturnType<typeof useAiCheckTranslationSuspenseQuery>
export type AiCheckTranslationQueryResult = Apollo.QueryResult<AiCheckTranslation, AiCheckTranslationVariables>
export const AiGetTranscriptionDocument = gql`
	query AIGetTranscription($engSentence: String!) {
		ai_getTranscription(input: { engSentence: $engSentence }) {
			... on GetTranscriptionOutSuccessModel {
				transcription
			}
			... on GetTranscriptionOutErrorModel {
				error
			}
		}
	}
`

/**
 * __useAiGetTranscription__
 *
 * To run a query within a React component, call `useAiGetTranscription` and pass it any options that fit your needs.
 * When your component renders, `useAiGetTranscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiGetTranscription({
 *   variables: {
 *      engSentence: // value for 'engSentence'
 *   },
 * });
 */
export function useAiGetTranscription(
	baseOptions: Apollo.QueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables> &
		({ variables: AiGetTranscriptionVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options)
}
export function useAiGetTranscriptionLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options)
}
export function useAiGetTranscriptionSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options)
}
export type AiGetTranscriptionHookResult = ReturnType<typeof useAiGetTranscription>
export type AiGetTranscriptionLazyQueryHookResult = ReturnType<typeof useAiGetTranscriptionLazyQuery>
export type AiGetTranscriptionSuspenseQueryHookResult = ReturnType<typeof useAiGetTranscriptionSuspenseQuery>
export type AiGetTranscriptionQueryResult = Apollo.QueryResult<AiGetTranscription, AiGetTranscriptionVariables>
