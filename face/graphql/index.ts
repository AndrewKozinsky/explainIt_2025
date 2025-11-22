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

export type AnalysePhraseInput = {
	/** Book author */
	bookAuthor?: InputMaybe<Scalars['String']['input']>
	/** Book chapter id */
	bookChapterId: Scalars['Int']['input']
	/** Book name */
	bookName?: InputMaybe<Scalars['String']['input']>
	/** Context */
	context: Scalars['String']['input']
	/** Фраза на иностранном языке для заучивания */
	phrase: Scalars['String']['input']
	/** Ids of the words in the phrase */
	phraseWordsIdx: Array<Scalars['Int']['input']>
	/** Предложение где находится фраза */
	sentence: Scalars['String']['input']
	/** Порядковый номер предложения где находится фраза */
	sentenceId: Scalars['Float']['input']
}

export type BookChapterLiteOutModel = {
	__typename?: 'BookChapterLiteOutModel'
	bookId: Scalars['Int']['output']
	header?: Maybe<Scalars['String']['output']>
	id: Scalars['Int']['output']
	name?: Maybe<Scalars['String']['output']>
	note?: Maybe<Scalars['String']['output']>
}

export type BookChapterOutModel = {
	__typename?: 'BookChapterOutModel'
	book: BookLiteOutModel
	content?: Maybe<Scalars['String']['output']>
	header?: Maybe<Scalars['String']['output']>
	id: Scalars['Int']['output']
	name?: Maybe<Scalars['String']['output']>
	note?: Maybe<Scalars['String']['output']>
	phrases: Array<BookChapterPhraseOutModel>
}

export type BookChapterPhraseOutModel = {
	__typename?: 'BookChapterPhraseOutModel'
	analysis: Scalars['String']['output']
	examples: Array<PhraseExample>
	id: Scalars['Int']['output']
	phrase: Scalars['String']['output']
	phraseWordsIdx: Array<Scalars['Int']['output']>
	sentence: Scalars['String']['output']
	sentenceId: Scalars['Int']['output']
	transcription: Scalars['String']['output']
	translation: Scalars['String']['output']
}

export type BookChapterTranslateOfSentencesOutModel = {
	__typename?: 'BookChapterTranslateOfSentencesOutModel'
	translates: Array<Scalars['String']['output']>
}

export type BookLiteOutModel = {
	__typename?: 'BookLiteOutModel'
	author?: Maybe<Scalars['String']['output']>
	id: Scalars['Int']['output']
	name?: Maybe<Scalars['String']['output']>
	note?: Maybe<Scalars['String']['output']>
	userId: Scalars['Int']['output']
}

export type BookOutModel = {
	__typename?: 'BookOutModel'
	author?: Maybe<Scalars['String']['output']>
	chapters: Array<BookChapterLiteOutModel>
	id: Scalars['Int']['output']
	name?: Maybe<Scalars['String']['output']>
	note?: Maybe<Scalars['String']['output']>
	userId: Scalars['Int']['output']
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

export type ConfirmEmailInput = {
	/** User email */
	code: Scalars['String']['input']
}

export type CreateBookChapterInput = {
	/** Book id */
	bookId: Scalars['Int']['input']
	/** Content of the chapter */
	content?: InputMaybe<Scalars['String']['input']>
	/** Header on the chapter */
	header?: InputMaybe<Scalars['String']['input']>
	/** Name on the chapter (chapter 1) */
	name?: InputMaybe<Scalars['String']['input']>
	/** Note about this chapter */
	note?: InputMaybe<Scalars['String']['input']>
}

export type CreateBookInput = {
	/** Author */
	author?: InputMaybe<Scalars['String']['input']>
	/** Name */
	name?: InputMaybe<Scalars['String']['input']>
	/** Note */
	note?: InputMaybe<Scalars['String']['input']>
}

export type DeleteBookChapterInput = {
	/** BookChapter id */
	id: Scalars['Int']['input']
}

export type DeleteBookChapterPhrasesInput = {
	/** Book chapter id */
	bookChapterId: Scalars['Int']['input']
}

export type DeleteBookInput = {
	/** Book id */
	id: Scalars['Int']['input']
}

export type GetBookChapterInput = {
	/** BookChapter id */
	id: Scalars['Int']['input']
}

export type GetBookInput = {
	/** Book id */
	id: Scalars['Int']['input']
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

export type LoginInput = {
	/** User email */
	email: Scalars['String']['input']
	/** User password */
	password: Scalars['String']['input']
}

export type LoginWithOAuthInput = {
	/** Code to get user data from OAuth provider */
	code: Scalars['String']['input']
	/** Provider type: github, google, yandex */
	providerType: Scalars['String']['input']
}

export type Mutation = {
	__typename?: 'Mutation'
	/** Email confirmation */
	auth_confirmEmail: Scalars['Boolean']['output']
	/** User login */
	auth_login: UserOutModel
	/** User login with OAuth */
	auth_login_with_OAuth: UserOutModel
	/** Current user logout */
	auth_logout: Scalars['Boolean']['output']
	/**
	 * Register a user.
	 * 	Possible errors:
	 * 	**Почта зарегистрирована, но не подтверждена.** — the user is already registered, but doesn't confirm his email.
	 * 	**Почта уже зарегистрирована.** — the user is already registered and confirmed his email.
	 */
	auth_register: UserOutModel
	/** Resend email confirmation letter */
	auth_resendConfirmationEmail: Scalars['Boolean']['output']
	book_chapter_AnalysePhrase: BookChapterPhraseOutModel
	book_chapter_DeleteBookChapterPhrases: Scalars['Boolean']['output']
	book_chapter_TranslateSentences: BookChapterTranslateOfSentencesOutModel
	/** Create book chapter */
	book_chapter_create: BookChapterOutModel
	/** Delete book chapter */
	book_chapter_delete: Scalars['Boolean']['output']
	/** Update book chapter */
	book_chapter_update: BookChapterOutModel
	/** Create book */
	book_create: BookOutModel
	/** Delete user book */
	book_delete: Scalars['Boolean']['output']
	/** Update user book */
	book_update: BookOutModel
	/** Top up a balance with YooKassa */
	payment_yookassa_top_up_balance: TopUpBalanceWithYooKassaOutModel
}

export type MutationAuth_ConfirmEmailArgs = {
	input: ConfirmEmailInput
}

export type MutationAuth_LoginArgs = {
	input: LoginInput
}

export type MutationAuth_Login_With_OAuthArgs = {
	input: LoginWithOAuthInput
}

export type MutationAuth_RegisterArgs = {
	input: RegisterUserInput
}

export type MutationAuth_ResendConfirmationEmailArgs = {
	input: ResendConfirmationEmailInput
}

export type MutationBook_Chapter_AnalysePhraseArgs = {
	input: AnalysePhraseInput
}

export type MutationBook_Chapter_DeleteBookChapterPhrasesArgs = {
	input: DeleteBookChapterPhrasesInput
}

export type MutationBook_Chapter_TranslateSentencesArgs = {
	input: TranslateSentencesInput
}

export type MutationBook_Chapter_CreateArgs = {
	input: CreateBookChapterInput
}

export type MutationBook_Chapter_DeleteArgs = {
	input: DeleteBookChapterInput
}

export type MutationBook_Chapter_UpdateArgs = {
	input: UpdateBookChapterInput
}

export type MutationBook_CreateArgs = {
	input: CreateBookInput
}

export type MutationBook_DeleteArgs = {
	input: DeleteBookInput
}

export type MutationBook_UpdateArgs = {
	input: UpdateBookInput
}

export type MutationPayment_Yookassa_Top_Up_BalanceArgs = {
	input: TopUpBalanceWithYooKassaInput
}

export type PhraseExample = {
	__typename?: 'PhraseExample'
	id: Scalars['Int']['output']
	sentence: Scalars['String']['output']
	translation: Scalars['String']['output']
}

export type Query = {
	__typename?: 'Query'
	ai_checkTranslation: CheckTranslationOutModel
	ai_getTranscription: GetTranscriptionOutModel
	/** Get current user data */
	auth_getMe: UserOutModel
	/** Get book chapter */
	book_chapter_get: BookChapterOutModel
	/** Get user book */
	book_get: BookOutModel
	/** Get user books */
	book_user_books: Array<BookOutModel>
}

export type QueryAi_CheckTranslationArgs = {
	input: CheckTranslationInput
}

export type QueryAi_GetTranscriptionArgs = {
	input: GetTranscriptionInput
}

export type QueryBook_Chapter_GetArgs = {
	input: GetBookChapterInput
}

export type QueryBook_GetArgs = {
	input: GetBookInput
}

export type RegisterUserInput = {
	/** User email */
	email: Scalars['String']['input']
	/** User password */
	password: Scalars['String']['input']
}

export type ResendConfirmationEmailInput = {
	/** User email */
	email: Scalars['String']['input']
}

export type TopUpBalanceWithYooKassaInput = {
	/** Money amount */
	amount: Scalars['Float']['input']
}

export type TopUpBalanceWithYooKassaOutModel = {
	__typename?: 'TopUpBalanceWithYooKassaOutModel'
	confirmationUrl: Scalars['String']['output']
}

export type TranslateSentencesInput = {
	/** Book author */
	bookAuthor?: InputMaybe<Scalars['String']['input']>
	/** Book name */
	bookName?: InputMaybe<Scalars['String']['input']>
	/** Array of sentences */
	sentences: Array<Scalars['String']['input']>
}

export type UpdateBookChapterInput = {
	/** BookChapter content */
	content?: InputMaybe<Scalars['String']['input']>
	/** BookChapter header */
	header?: InputMaybe<Scalars['String']['input']>
	/** BookChapter id */
	id: Scalars['Int']['input']
	/** BookChapter name (chapter 1) */
	name?: InputMaybe<Scalars['String']['input']>
	/** BookChapter note */
	note?: InputMaybe<Scalars['String']['input']>
}

export type UpdateBookInput = {
	/** Author */
	author?: InputMaybe<Scalars['String']['input']>
	/** Book id */
	id: Scalars['Int']['input']
	/** Name */
	name?: InputMaybe<Scalars['String']['input']>
	/** Note */
	note?: InputMaybe<Scalars['String']['input']>
}

export type UserOutModel = {
	__typename?: 'UserOutModel'
	balance: Scalars['Int']['output']
	email: Scalars['String']['output']
	id: Scalars['Int']['output']
	isUserConfirmed: Scalars['Boolean']['output']
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

export type Auth_ConfirmEmailVariables = Exact<{
	input: ConfirmEmailInput
}>

export type Auth_ConfirmEmail = { __typename?: 'Mutation'; auth_confirmEmail: boolean }

export type Auth_GetMeVariables = Exact<{ [key: string]: never }>

export type Auth_GetMe = {
	__typename?: 'Query'
	auth_getMe: { __typename?: 'UserOutModel'; id: number; email: string; isUserConfirmed: boolean; balance: number }
}

export type Auth_LoginVariables = Exact<{
	input: LoginInput
}>

export type Auth_Login = {
	__typename?: 'Mutation'
	auth_login: { __typename?: 'UserOutModel'; id: number; email: string; isUserConfirmed: boolean }
}

export type Auth_Login_With_OAuthVariables = Exact<{
	input: LoginWithOAuthInput
}>

export type Auth_Login_With_OAuth = {
	__typename?: 'Mutation'
	auth_login_with_OAuth: { __typename?: 'UserOutModel'; id: number; email: string; isUserConfirmed: boolean }
}

export type Auth_LogoutVariables = Exact<{ [key: string]: never }>

export type Auth_Logout = { __typename?: 'Mutation'; auth_logout: boolean }

export type Auth_RegisterVariables = Exact<{
	input: RegisterUserInput
}>

export type Auth_Register = {
	__typename?: 'Mutation'
	auth_register: { __typename?: 'UserOutModel'; id: number; email: string }
}

export type Book_CreateVariables = Exact<{
	input: CreateBookInput
}>

export type Book_Create = {
	__typename?: 'Mutation'
	book_create: {
		__typename?: 'BookOutModel'
		id: number
		author?: string | null
		name?: string | null
		note?: string | null
		userId: number
		chapters: Array<{
			__typename?: 'BookChapterLiteOutModel'
			id: number
			bookId: number
			name?: string | null
			header?: string | null
			note?: string | null
		}>
	}
}

export type Book_DeleteVariables = Exact<{
	input: DeleteBookInput
}>

export type Book_Delete = { __typename?: 'Mutation'; book_delete: boolean }

export type Book_GetVariables = Exact<{
	input: GetBookInput
}>

export type Book_Get = {
	__typename?: 'Query'
	book_get: {
		__typename?: 'BookOutModel'
		id: number
		author?: string | null
		name?: string | null
		note?: string | null
		userId: number
		chapters: Array<{
			__typename?: 'BookChapterLiteOutModel'
			id: number
			bookId: number
			name?: string | null
			header?: string | null
			note?: string | null
		}>
	}
}

export type Book_GetUserBooksVariables = Exact<{ [key: string]: never }>

export type Book_GetUserBooks = {
	__typename?: 'Query'
	book_user_books: Array<{
		__typename?: 'BookOutModel'
		id: number
		author?: string | null
		name?: string | null
		note?: string | null
		userId: number
		chapters: Array<{
			__typename?: 'BookChapterLiteOutModel'
			id: number
			bookId: number
			name?: string | null
			header?: string | null
			note?: string | null
		}>
	}>
}

export type Book_UpdateVariables = Exact<{
	input: UpdateBookInput
}>

export type Book_Update = {
	__typename?: 'Mutation'
	book_update: {
		__typename?: 'BookOutModel'
		id: number
		author?: string | null
		name?: string | null
		note?: string | null
		userId: number
		chapters: Array<{
			__typename?: 'BookChapterLiteOutModel'
			id: number
			bookId: number
			name?: string | null
			header?: string | null
			note?: string | null
		}>
	}
}

export type Book_Chapter_AnalysePhraseVariables = Exact<{
	input: AnalysePhraseInput
}>

export type Book_Chapter_AnalysePhrase = {
	__typename?: 'Mutation'
	book_chapter_AnalysePhrase: {
		__typename?: 'BookChapterPhraseOutModel'
		id: number
		sentenceId: number
		sentence: string
		phrase: string
		transcription: string
		phraseWordsIdx: Array<number>
		translation: string
		analysis: string
		examples: Array<{ __typename?: 'PhraseExample'; id: number; sentence: string; translation: string }>
	}
}

export type BookChapter_CreateVariables = Exact<{
	input: CreateBookChapterInput
}>

export type BookChapter_Create = {
	__typename?: 'Mutation'
	book_chapter_create: {
		__typename?: 'BookChapterOutModel'
		id: number
		name?: string | null
		header?: string | null
		content?: string | null
		note?: string | null
		book: {
			__typename?: 'BookLiteOutModel'
			id: number
			name?: string | null
			author?: string | null
			note?: string | null
			userId: number
		}
	}
}

export type BookChapter_DeleteVariables = Exact<{
	input: DeleteBookChapterInput
}>

export type BookChapter_Delete = { __typename?: 'Mutation'; book_chapter_delete: boolean }

export type BookChapter_DeleteBookChapterPhrasesVariables = Exact<{
	input: DeleteBookChapterPhrasesInput
}>

export type BookChapter_DeleteBookChapterPhrases = {
	__typename?: 'Mutation'
	book_chapter_DeleteBookChapterPhrases: boolean
}

export type BookChapter_GetVariables = Exact<{
	input: GetBookChapterInput
}>

export type BookChapter_Get = {
	__typename?: 'Query'
	book_chapter_get: {
		__typename?: 'BookChapterOutModel'
		id: number
		name?: string | null
		header?: string | null
		content?: string | null
		note?: string | null
		book: {
			__typename?: 'BookLiteOutModel'
			id: number
			name?: string | null
			author?: string | null
			note?: string | null
			userId: number
		}
		phrases: Array<{
			__typename?: 'BookChapterPhraseOutModel'
			id: number
			sentenceId: number
			sentence: string
			phrase: string
			transcription: string
			phraseWordsIdx: Array<number>
			translation: string
			analysis: string
			examples: Array<{ __typename?: 'PhraseExample'; id: number; sentence: string; translation: string }>
		}>
	}
}

export type Book_Chapter_TranslateSentencesVariables = Exact<{
	input: TranslateSentencesInput
}>

export type Book_Chapter_TranslateSentences = {
	__typename?: 'Mutation'
	book_chapter_TranslateSentences: {
		__typename?: 'BookChapterTranslateOfSentencesOutModel'
		translates: Array<string>
	}
}

export type BookChapter_UpdateVariables = Exact<{
	input: UpdateBookChapterInput
}>

export type BookChapter_Update = {
	__typename?: 'Mutation'
	book_chapter_update: {
		__typename?: 'BookChapterOutModel'
		id: number
		name?: string | null
		header?: string | null
		content?: string | null
		note?: string | null
		book: {
			__typename?: 'BookLiteOutModel'
			id: number
			name?: string | null
			author?: string | null
			note?: string | null
			userId: number
		}
	}
}

export type Payment_YookassaTopUpBalanceVariables = Exact<{
	input: TopUpBalanceWithYooKassaInput
}>

export type Payment_YookassaTopUpBalance = {
	__typename?: 'Mutation'
	payment_yookassa_top_up_balance: { __typename?: 'TopUpBalanceWithYooKassaOutModel'; confirmationUrl: string }
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
export const Auth_ConfirmEmailDocument = gql`
	mutation Auth_confirmEmail($input: ConfirmEmailInput!) {
		auth_confirmEmail(input: $input)
	}
`
export type Auth_ConfirmEmailMutationFn = Apollo.MutationFunction<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>

/**
 * __useAuth_ConfirmEmail__
 *
 * To run a mutation, you first call `useAuth_ConfirmEmail` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuth_ConfirmEmail` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authConfirmEmail, { data, loading, error }] = useAuth_ConfirmEmail({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuth_ConfirmEmail(
	baseOptions?: Apollo.MutationHookOptions<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>(Auth_ConfirmEmailDocument, options)
}
export type Auth_ConfirmEmailHookResult = ReturnType<typeof useAuth_ConfirmEmail>
export type Auth_ConfirmEmailMutationResult = Apollo.MutationResult<Auth_ConfirmEmail>
export type Auth_ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>
export const Auth_GetMeDocument = gql`
	query Auth_getMe {
		auth_getMe {
			id
			email
			isUserConfirmed
			balance
		}
	}
`

/**
 * __useAuth_GetMe__
 *
 * To run a query within a React component, call `useAuth_GetMe` and pass it any options that fit your needs.
 * When your component renders, `useAuth_GetMe` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuth_GetMe({
 *   variables: {
 *   },
 * });
 */
export function useAuth_GetMe(baseOptions?: Apollo.QueryHookOptions<Auth_GetMe, Auth_GetMeVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options)
}
export function useAuth_GetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options)
}
export function useAuth_GetMeSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options)
}
export type Auth_GetMeHookResult = ReturnType<typeof useAuth_GetMe>
export type Auth_GetMeLazyQueryHookResult = ReturnType<typeof useAuth_GetMeLazyQuery>
export type Auth_GetMeSuspenseQueryHookResult = ReturnType<typeof useAuth_GetMeSuspenseQuery>
export type Auth_GetMeQueryResult = Apollo.QueryResult<Auth_GetMe, Auth_GetMeVariables>
export const Auth_LoginDocument = gql`
	mutation Auth_login($input: LoginInput!) {
		auth_login(input: $input) {
			id
			email
			isUserConfirmed
		}
	}
`
export type Auth_LoginMutationFn = Apollo.MutationFunction<Auth_Login, Auth_LoginVariables>

/**
 * __useAuth_Login__
 *
 * To run a mutation, you first call `useAuth_Login` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuth_Login` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLogin, { data, loading, error }] = useAuth_Login({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuth_Login(baseOptions?: Apollo.MutationHookOptions<Auth_Login, Auth_LoginVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Auth_Login, Auth_LoginVariables>(Auth_LoginDocument, options)
}
export type Auth_LoginHookResult = ReturnType<typeof useAuth_Login>
export type Auth_LoginMutationResult = Apollo.MutationResult<Auth_Login>
export type Auth_LoginMutationOptions = Apollo.BaseMutationOptions<Auth_Login, Auth_LoginVariables>
export const Auth_Login_With_OAuthDocument = gql`
	mutation Auth_login_with_OAuth($input: LoginWithOAuthInput!) {
		auth_login_with_OAuth(input: $input) {
			id
			email
			isUserConfirmed
		}
	}
`
export type Auth_Login_With_OAuthMutationFn = Apollo.MutationFunction<
	Auth_Login_With_OAuth,
	Auth_Login_With_OAuthVariables
>

/**
 * __useAuth_Login_With_OAuth__
 *
 * To run a mutation, you first call `useAuth_Login_With_OAuth` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuth_Login_With_OAuth` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLoginWithOAuth, { data, loading, error }] = useAuth_Login_With_OAuth({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuth_Login_With_OAuth(
	baseOptions?: Apollo.MutationHookOptions<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>(
		Auth_Login_With_OAuthDocument,
		options,
	)
}
export type Auth_Login_With_OAuthHookResult = ReturnType<typeof useAuth_Login_With_OAuth>
export type Auth_Login_With_OAuthMutationResult = Apollo.MutationResult<Auth_Login_With_OAuth>
export type Auth_Login_With_OAuthMutationOptions = Apollo.BaseMutationOptions<
	Auth_Login_With_OAuth,
	Auth_Login_With_OAuthVariables
>
export const Auth_LogoutDocument = gql`
	mutation Auth_logout {
		auth_logout
	}
`
export type Auth_LogoutMutationFn = Apollo.MutationFunction<Auth_Logout, Auth_LogoutVariables>

/**
 * __useAuth_Logout__
 *
 * To run a mutation, you first call `useAuth_Logout` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuth_Logout` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authLogout, { data, loading, error }] = useAuth_Logout({
 *   variables: {
 *   },
 * });
 */
export function useAuth_Logout(baseOptions?: Apollo.MutationHookOptions<Auth_Logout, Auth_LogoutVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Auth_Logout, Auth_LogoutVariables>(Auth_LogoutDocument, options)
}
export type Auth_LogoutHookResult = ReturnType<typeof useAuth_Logout>
export type Auth_LogoutMutationResult = Apollo.MutationResult<Auth_Logout>
export type Auth_LogoutMutationOptions = Apollo.BaseMutationOptions<Auth_Logout, Auth_LogoutVariables>
export const Auth_RegisterDocument = gql`
	mutation Auth_register($input: RegisterUserInput!) {
		auth_register(input: $input) {
			id
			email
		}
	}
`
export type Auth_RegisterMutationFn = Apollo.MutationFunction<Auth_Register, Auth_RegisterVariables>

/**
 * __useAuth_Register__
 *
 * To run a mutation, you first call `useAuth_Register` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuth_Register` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRegister, { data, loading, error }] = useAuth_Register({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuth_Register(baseOptions?: Apollo.MutationHookOptions<Auth_Register, Auth_RegisterVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Auth_Register, Auth_RegisterVariables>(Auth_RegisterDocument, options)
}
export type Auth_RegisterHookResult = ReturnType<typeof useAuth_Register>
export type Auth_RegisterMutationResult = Apollo.MutationResult<Auth_Register>
export type Auth_RegisterMutationOptions = Apollo.BaseMutationOptions<Auth_Register, Auth_RegisterVariables>
export const Book_CreateDocument = gql`
	mutation Book_create($input: CreateBookInput!) {
		book_create(input: $input) {
			id
			author
			name
			note
			userId
			chapters {
				id
				bookId
				name
				header
				note
			}
		}
	}
`
export type Book_CreateMutationFn = Apollo.MutationFunction<Book_Create, Book_CreateVariables>

/**
 * __useBook_Create__
 *
 * To run a mutation, you first call `useBook_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBook_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookCreate, { data, loading, error }] = useBook_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Create(baseOptions?: Apollo.MutationHookOptions<Book_Create, Book_CreateVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Book_Create, Book_CreateVariables>(Book_CreateDocument, options)
}
export type Book_CreateHookResult = ReturnType<typeof useBook_Create>
export type Book_CreateMutationResult = Apollo.MutationResult<Book_Create>
export type Book_CreateMutationOptions = Apollo.BaseMutationOptions<Book_Create, Book_CreateVariables>
export const Book_DeleteDocument = gql`
	mutation Book_delete($input: DeleteBookInput!) {
		book_delete(input: $input)
	}
`
export type Book_DeleteMutationFn = Apollo.MutationFunction<Book_Delete, Book_DeleteVariables>

/**
 * __useBook_Delete__
 *
 * To run a mutation, you first call `useBook_Delete` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBook_Delete` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookDelete, { data, loading, error }] = useBook_Delete({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Delete(baseOptions?: Apollo.MutationHookOptions<Book_Delete, Book_DeleteVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Book_Delete, Book_DeleteVariables>(Book_DeleteDocument, options)
}
export type Book_DeleteHookResult = ReturnType<typeof useBook_Delete>
export type Book_DeleteMutationResult = Apollo.MutationResult<Book_Delete>
export type Book_DeleteMutationOptions = Apollo.BaseMutationOptions<Book_Delete, Book_DeleteVariables>
export const Book_GetDocument = gql`
	query Book_get($input: GetBookInput!) {
		book_get(input: $input) {
			id
			author
			name
			note
			userId
			chapters {
				id
				bookId
				name
				header
				note
			}
		}
	}
`

/**
 * __useBook_Get__
 *
 * To run a query within a React component, call `useBook_Get` and pass it any options that fit your needs.
 * When your component renders, `useBook_Get` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBook_Get({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Get(
	baseOptions: Apollo.QueryHookOptions<Book_Get, Book_GetVariables> &
		({ variables: Book_GetVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options)
}
export function useBook_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Book_Get, Book_GetVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options)
}
export function useBook_GetSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_Get, Book_GetVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options)
}
export type Book_GetHookResult = ReturnType<typeof useBook_Get>
export type Book_GetLazyQueryHookResult = ReturnType<typeof useBook_GetLazyQuery>
export type Book_GetSuspenseQueryHookResult = ReturnType<typeof useBook_GetSuspenseQuery>
export type Book_GetQueryResult = Apollo.QueryResult<Book_Get, Book_GetVariables>
export const Book_GetUserBooksDocument = gql`
	query Book_getUserBooks {
		book_user_books {
			id
			author
			name
			note
			userId
			chapters {
				id
				bookId
				name
				header
				note
			}
		}
	}
`

/**
 * __useBook_GetUserBooks__
 *
 * To run a query within a React component, call `useBook_GetUserBooks` and pass it any options that fit your needs.
 * When your component renders, `useBook_GetUserBooks` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBook_GetUserBooks({
 *   variables: {
 *   },
 * });
 */
export function useBook_GetUserBooks(
	baseOptions?: Apollo.QueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options)
}
export function useBook_GetUserBooksLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options)
}
export function useBook_GetUserBooksSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options)
}
export type Book_GetUserBooksHookResult = ReturnType<typeof useBook_GetUserBooks>
export type Book_GetUserBooksLazyQueryHookResult = ReturnType<typeof useBook_GetUserBooksLazyQuery>
export type Book_GetUserBooksSuspenseQueryHookResult = ReturnType<typeof useBook_GetUserBooksSuspenseQuery>
export type Book_GetUserBooksQueryResult = Apollo.QueryResult<Book_GetUserBooks, Book_GetUserBooksVariables>
export const Book_UpdateDocument = gql`
	mutation Book_update($input: UpdateBookInput!) {
		book_update(input: $input) {
			id
			author
			name
			note
			userId
			chapters {
				id
				bookId
				name
				header
				note
			}
		}
	}
`
export type Book_UpdateMutationFn = Apollo.MutationFunction<Book_Update, Book_UpdateVariables>

/**
 * __useBook_Update__
 *
 * To run a mutation, you first call `useBook_Update` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBook_Update` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookUpdate, { data, loading, error }] = useBook_Update({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Update(baseOptions?: Apollo.MutationHookOptions<Book_Update, Book_UpdateVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Book_Update, Book_UpdateVariables>(Book_UpdateDocument, options)
}
export type Book_UpdateHookResult = ReturnType<typeof useBook_Update>
export type Book_UpdateMutationResult = Apollo.MutationResult<Book_Update>
export type Book_UpdateMutationOptions = Apollo.BaseMutationOptions<Book_Update, Book_UpdateVariables>
export const Book_Chapter_AnalysePhraseDocument = gql`
	mutation Book_chapter_AnalysePhrase($input: AnalysePhraseInput!) {
		book_chapter_AnalysePhrase(input: $input) {
			id
			sentenceId
			sentence
			phrase
			transcription
			phraseWordsIdx
			translation
			analysis
			examples {
				id
				sentence
				translation
			}
		}
	}
`
export type Book_Chapter_AnalysePhraseMutationFn = Apollo.MutationFunction<
	Book_Chapter_AnalysePhrase,
	Book_Chapter_AnalysePhraseVariables
>

/**
 * __useBook_Chapter_AnalysePhrase__
 *
 * To run a mutation, you first call `useBook_Chapter_AnalysePhrase` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBook_Chapter_AnalysePhrase` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterAnalysePhrase, { data, loading, error }] = useBook_Chapter_AnalysePhrase({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Chapter_AnalysePhrase(
	baseOptions?: Apollo.MutationHookOptions<Book_Chapter_AnalysePhrase, Book_Chapter_AnalysePhraseVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Book_Chapter_AnalysePhrase, Book_Chapter_AnalysePhraseVariables>(
		Book_Chapter_AnalysePhraseDocument,
		options,
	)
}
export type Book_Chapter_AnalysePhraseHookResult = ReturnType<typeof useBook_Chapter_AnalysePhrase>
export type Book_Chapter_AnalysePhraseMutationResult = Apollo.MutationResult<Book_Chapter_AnalysePhrase>
export type Book_Chapter_AnalysePhraseMutationOptions = Apollo.BaseMutationOptions<
	Book_Chapter_AnalysePhrase,
	Book_Chapter_AnalysePhraseVariables
>
export const BookChapter_CreateDocument = gql`
	mutation BookChapter_create($input: CreateBookChapterInput!) {
		book_chapter_create(input: $input) {
			id
			name
			header
			content
			note
			book {
				id
				name
				author
				note
				userId
			}
		}
	}
`
export type BookChapter_CreateMutationFn = Apollo.MutationFunction<BookChapter_Create, BookChapter_CreateVariables>

/**
 * __useBookChapter_Create__
 *
 * To run a mutation, you first call `useBookChapter_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookChapter_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterCreate, { data, loading, error }] = useBookChapter_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookChapter_Create(
	baseOptions?: Apollo.MutationHookOptions<BookChapter_Create, BookChapter_CreateVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<BookChapter_Create, BookChapter_CreateVariables>(BookChapter_CreateDocument, options)
}
export type BookChapter_CreateHookResult = ReturnType<typeof useBookChapter_Create>
export type BookChapter_CreateMutationResult = Apollo.MutationResult<BookChapter_Create>
export type BookChapter_CreateMutationOptions = Apollo.BaseMutationOptions<
	BookChapter_Create,
	BookChapter_CreateVariables
>
export const BookChapter_DeleteDocument = gql`
	mutation BookChapter_delete($input: DeleteBookChapterInput!) {
		book_chapter_delete(input: $input)
	}
`
export type BookChapter_DeleteMutationFn = Apollo.MutationFunction<BookChapter_Delete, BookChapter_DeleteVariables>

/**
 * __useBookChapter_Delete__
 *
 * To run a mutation, you first call `useBookChapter_Delete` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookChapter_Delete` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterDelete, { data, loading, error }] = useBookChapter_Delete({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookChapter_Delete(
	baseOptions?: Apollo.MutationHookOptions<BookChapter_Delete, BookChapter_DeleteVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<BookChapter_Delete, BookChapter_DeleteVariables>(BookChapter_DeleteDocument, options)
}
export type BookChapter_DeleteHookResult = ReturnType<typeof useBookChapter_Delete>
export type BookChapter_DeleteMutationResult = Apollo.MutationResult<BookChapter_Delete>
export type BookChapter_DeleteMutationOptions = Apollo.BaseMutationOptions<
	BookChapter_Delete,
	BookChapter_DeleteVariables
>
export const BookChapter_DeleteBookChapterPhrasesDocument = gql`
	mutation BookChapter_DeleteBookChapterPhrases($input: DeleteBookChapterPhrasesInput!) {
		book_chapter_DeleteBookChapterPhrases(input: $input)
	}
`
export type BookChapter_DeleteBookChapterPhrasesMutationFn = Apollo.MutationFunction<
	BookChapter_DeleteBookChapterPhrases,
	BookChapter_DeleteBookChapterPhrasesVariables
>

/**
 * __useBookChapter_DeleteBookChapterPhrases__
 *
 * To run a mutation, you first call `useBookChapter_DeleteBookChapterPhrases` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookChapter_DeleteBookChapterPhrases` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterDeleteBookChapterPhrases, { data, loading, error }] = useBookChapter_DeleteBookChapterPhrases({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookChapter_DeleteBookChapterPhrases(
	baseOptions?: Apollo.MutationHookOptions<
		BookChapter_DeleteBookChapterPhrases,
		BookChapter_DeleteBookChapterPhrasesVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<BookChapter_DeleteBookChapterPhrases, BookChapter_DeleteBookChapterPhrasesVariables>(
		BookChapter_DeleteBookChapterPhrasesDocument,
		options,
	)
}
export type BookChapter_DeleteBookChapterPhrasesHookResult = ReturnType<typeof useBookChapter_DeleteBookChapterPhrases>
export type BookChapter_DeleteBookChapterPhrasesMutationResult =
	Apollo.MutationResult<BookChapter_DeleteBookChapterPhrases>
export type BookChapter_DeleteBookChapterPhrasesMutationOptions = Apollo.BaseMutationOptions<
	BookChapter_DeleteBookChapterPhrases,
	BookChapter_DeleteBookChapterPhrasesVariables
>
export const BookChapter_GetDocument = gql`
	query BookChapter_get($input: GetBookChapterInput!) {
		book_chapter_get(input: $input) {
			id
			name
			header
			content
			note
			book {
				id
				name
				author
				note
				userId
			}
			phrases {
				id
				sentenceId
				sentence
				phrase
				transcription
				phraseWordsIdx
				translation
				analysis
				examples {
					id
					sentence
					translation
				}
			}
		}
	}
`

/**
 * __useBookChapter_Get__
 *
 * To run a query within a React component, call `useBookChapter_Get` and pass it any options that fit your needs.
 * When your component renders, `useBookChapter_Get` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookChapter_Get({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookChapter_Get(
	baseOptions: Apollo.QueryHookOptions<BookChapter_Get, BookChapter_GetVariables> &
		({ variables: BookChapter_GetVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options)
}
export function useBookChapter_GetLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options)
}
export function useBookChapter_GetSuspenseQuery(
	baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>,
) {
	const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
	return Apollo.useSuspenseQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options)
}
export type BookChapter_GetHookResult = ReturnType<typeof useBookChapter_Get>
export type BookChapter_GetLazyQueryHookResult = ReturnType<typeof useBookChapter_GetLazyQuery>
export type BookChapter_GetSuspenseQueryHookResult = ReturnType<typeof useBookChapter_GetSuspenseQuery>
export type BookChapter_GetQueryResult = Apollo.QueryResult<BookChapter_Get, BookChapter_GetVariables>
export const Book_Chapter_TranslateSentencesDocument = gql`
	mutation Book_chapter_TranslateSentences($input: TranslateSentencesInput!) {
		book_chapter_TranslateSentences(input: $input) {
			translates
		}
	}
`
export type Book_Chapter_TranslateSentencesMutationFn = Apollo.MutationFunction<
	Book_Chapter_TranslateSentences,
	Book_Chapter_TranslateSentencesVariables
>

/**
 * __useBook_Chapter_TranslateSentences__
 *
 * To run a mutation, you first call `useBook_Chapter_TranslateSentences` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBook_Chapter_TranslateSentences` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterTranslateSentences, { data, loading, error }] = useBook_Chapter_TranslateSentences({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_Chapter_TranslateSentences(
	baseOptions?: Apollo.MutationHookOptions<Book_Chapter_TranslateSentences, Book_Chapter_TranslateSentencesVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Book_Chapter_TranslateSentences, Book_Chapter_TranslateSentencesVariables>(
		Book_Chapter_TranslateSentencesDocument,
		options,
	)
}
export type Book_Chapter_TranslateSentencesHookResult = ReturnType<typeof useBook_Chapter_TranslateSentences>
export type Book_Chapter_TranslateSentencesMutationResult = Apollo.MutationResult<Book_Chapter_TranslateSentences>
export type Book_Chapter_TranslateSentencesMutationOptions = Apollo.BaseMutationOptions<
	Book_Chapter_TranslateSentences,
	Book_Chapter_TranslateSentencesVariables
>
export const BookChapter_UpdateDocument = gql`
	mutation BookChapter_update($input: UpdateBookChapterInput!) {
		book_chapter_update(input: $input) {
			id
			name
			header
			content
			note
			book {
				id
				name
				author
				note
				userId
			}
		}
	}
`
export type BookChapter_UpdateMutationFn = Apollo.MutationFunction<BookChapter_Update, BookChapter_UpdateVariables>

/**
 * __useBookChapter_Update__
 *
 * To run a mutation, you first call `useBookChapter_Update` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookChapter_Update` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookChapterUpdate, { data, loading, error }] = useBookChapter_Update({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookChapter_Update(
	baseOptions?: Apollo.MutationHookOptions<BookChapter_Update, BookChapter_UpdateVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<BookChapter_Update, BookChapter_UpdateVariables>(BookChapter_UpdateDocument, options)
}
export type BookChapter_UpdateHookResult = ReturnType<typeof useBookChapter_Update>
export type BookChapter_UpdateMutationResult = Apollo.MutationResult<BookChapter_Update>
export type BookChapter_UpdateMutationOptions = Apollo.BaseMutationOptions<
	BookChapter_Update,
	BookChapter_UpdateVariables
>
export const Payment_YookassaTopUpBalanceDocument = gql`
	mutation Payment_yookassaTopUpBalance($input: TopUpBalanceWithYooKassaInput!) {
		payment_yookassa_top_up_balance(input: $input) {
			confirmationUrl
		}
	}
`
export type Payment_YookassaTopUpBalanceMutationFn = Apollo.MutationFunction<
	Payment_YookassaTopUpBalance,
	Payment_YookassaTopUpBalanceVariables
>

/**
 * __usePayment_YookassaTopUpBalance__
 *
 * To run a mutation, you first call `usePayment_YookassaTopUpBalance` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayment_YookassaTopUpBalance` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentYookassaTopUpBalance, { data, loading, error }] = usePayment_YookassaTopUpBalance({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayment_YookassaTopUpBalance(
	baseOptions?: Apollo.MutationHookOptions<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>(
		Payment_YookassaTopUpBalanceDocument,
		options,
	)
}
export type Payment_YookassaTopUpBalanceHookResult = ReturnType<typeof usePayment_YookassaTopUpBalance>
export type Payment_YookassaTopUpBalanceMutationResult = Apollo.MutationResult<Payment_YookassaTopUpBalance>
export type Payment_YookassaTopUpBalanceMutationOptions = Apollo.BaseMutationOptions<
	Payment_YookassaTopUpBalance,
	Payment_YookassaTopUpBalanceVariables
>
