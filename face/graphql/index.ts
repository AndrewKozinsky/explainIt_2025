import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CheckTranslationInput = {
  /** Sentence in English */
  engSentence: Scalars['String']['input'];
  /** Sentence in Russian */
  rusSentence: Scalars['String']['input'];
};

export type CheckTranslationOutErrorModel = {
  __typename?: 'CheckTranslationOutErrorModel';
  error: Scalars['String']['output'];
};

export type CheckTranslationOutModel = CheckTranslationOutErrorModel | CheckTranslationOutSuccessModel;

export type CheckTranslationOutSuccessModel = {
  __typename?: 'CheckTranslationOutSuccessModel';
  analysis: Scalars['String']['output'];
  correct: Scalars['Boolean']['output'];
};

export type ConfirmEmailInput = {
  /** User email */
  code: Scalars['String']['input'];
};

export type GetTranscriptionInput = {
  /** Sentence in English */
  engSentence: Scalars['String']['input'];
};

export type GetTranscriptionOutErrorModel = {
  __typename?: 'GetTranscriptionOutErrorModel';
  error: Scalars['String']['output'];
};

export type GetTranscriptionOutModel = GetTranscriptionOutErrorModel | GetTranscriptionOutSuccessModel;

export type GetTranscriptionOutSuccessModel = {
  __typename?: 'GetTranscriptionOutSuccessModel';
  transcription: Scalars['String']['output'];
};

export type LoginInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

export type LoginWithOAuthInput = {
  /** Code to get user data from OAuth provider */
  code: Scalars['String']['input'];
  /** Provider type: github, google, yandex */
  providerType: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Email confirmation */
  auth_confirmEmail: Scalars['Boolean']['output'];
  /** User login */
  auth_login: UserOutModel;
  /** User login with OAuth */
  auth_login_with_OAuth: UserOutModel;
  /** Current user logout */
  auth_logout: Scalars['Boolean']['output'];
  /**
   * Register a user.
   * 	Possible errors:
   * 	**Почта зарегистрирована, но не подтверждена.** — the user is already registered, but doesn't confirm his email.
   * 	**Почта уже зарегистрирована.** — the user is already registered and confirmed his email.
   */
  auth_register: UserOutModel;
  /** Resend email confirmation letter */
  auth_resendConfirmationEmail: Scalars['Boolean']['output'];
  /** Top up a balance with YooKassa */
  payment_yookassa_top_up_balance: TopUpBalanceWithYooKassaOutModel;
};


export type MutationAuth_ConfirmEmailArgs = {
  input: ConfirmEmailInput;
};


export type MutationAuth_LoginArgs = {
  input: LoginInput;
};


export type MutationAuth_Login_With_OAuthArgs = {
  input: LoginWithOAuthInput;
};


export type MutationAuth_RegisterArgs = {
  input: RegisterUserInput;
};


export type MutationAuth_ResendConfirmationEmailArgs = {
  input: ResendConfirmationEmailInput;
};


export type MutationPayment_Yookassa_Top_Up_BalanceArgs = {
  input: TopUpBalanceWithYooKassaInput;
};

export type Query = {
  __typename?: 'Query';
  ai_checkTranslation: CheckTranslationOutModel;
  ai_getTranscription: GetTranscriptionOutModel;
  /** Get current user data */
  auth_getMe: UserOutModel;
};


export type QueryAi_CheckTranslationArgs = {
  input: CheckTranslationInput;
};


export type QueryAi_GetTranscriptionArgs = {
  input: GetTranscriptionInput;
};

export type RegisterUserInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

export type ResendConfirmationEmailInput = {
  /** User email */
  email: Scalars['String']['input'];
};

export type TopUpBalanceWithYooKassaInput = {
  /** Money amount */
  amount: Scalars['Float']['input'];
};

export type TopUpBalanceWithYooKassaOutModel = {
  __typename?: 'TopUpBalanceWithYooKassaOutModel';
  confirmationUrl: Scalars['String']['output'];
};

export type UserOutModel = {
  __typename?: 'UserOutModel';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type AiCheckTranslationVariables = Exact<{
  rusSentence: Scalars['String']['input'];
  engSentence: Scalars['String']['input'];
}>;


export type AiCheckTranslation = { __typename?: 'Query', ai_checkTranslation: { __typename?: 'CheckTranslationOutErrorModel', error: string } | { __typename?: 'CheckTranslationOutSuccessModel', correct: boolean, analysis: string } };

export type AiGetTranscriptionVariables = Exact<{
  engSentence: Scalars['String']['input'];
}>;


export type AiGetTranscription = { __typename?: 'Query', ai_getTranscription: { __typename?: 'GetTranscriptionOutErrorModel', error: string } | { __typename?: 'GetTranscriptionOutSuccessModel', transcription: string } };

export type Auth_ConfirmEmailVariables = Exact<{
  input: ConfirmEmailInput;
}>;


export type Auth_ConfirmEmail = { __typename?: 'Mutation', auth_confirmEmail: boolean };

export type Auth_GetMeVariables = Exact<{ [key: string]: never; }>;


export type Auth_GetMe = { __typename?: 'Query', auth_getMe: { __typename?: 'UserOutModel', id: number, email: string } };

export type Auth_LoginVariables = Exact<{
  input: LoginInput;
}>;


export type Auth_Login = { __typename?: 'Mutation', auth_login: { __typename?: 'UserOutModel', id: number, email: string } };

export type Auth_Login_With_OAuthVariables = Exact<{
  input: LoginWithOAuthInput;
}>;


export type Auth_Login_With_OAuth = { __typename?: 'Mutation', auth_login_with_OAuth: { __typename?: 'UserOutModel', id: number, email: string } };

export type Auth_LogoutVariables = Exact<{ [key: string]: never; }>;


export type Auth_Logout = { __typename?: 'Mutation', auth_logout: boolean };

export type Auth_RegisterVariables = Exact<{
  input: RegisterUserInput;
}>;


export type Auth_Register = { __typename?: 'Mutation', auth_register: { __typename?: 'UserOutModel', id: number, email: string } };

export type Payment_YookassaTopUpBalanceVariables = Exact<{
  input: TopUpBalanceWithYooKassaInput;
}>;


export type Payment_YookassaTopUpBalance = { __typename?: 'Mutation', payment_yookassa_top_up_balance: { __typename?: 'TopUpBalanceWithYooKassaOutModel', confirmationUrl: string } };


export const AiCheckTranslationDocument = gql`
    query AICheckTranslation($rusSentence: String!, $engSentence: String!) {
  ai_checkTranslation(
    input: {rusSentence: $rusSentence, engSentence: $engSentence}
  ) {
    ... on CheckTranslationOutSuccessModel {
      correct
      analysis
    }
    ... on CheckTranslationOutErrorModel {
      error
    }
  }
}
    `;

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
export function useAiCheckTranslation(baseOptions: Apollo.QueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables> & ({ variables: AiCheckTranslationVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options);
      }
export function useAiCheckTranslationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options);
        }
export function useAiCheckTranslationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AiCheckTranslation, AiCheckTranslationVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AiCheckTranslation, AiCheckTranslationVariables>(AiCheckTranslationDocument, options);
        }
export type AiCheckTranslationHookResult = ReturnType<typeof useAiCheckTranslation>;
export type AiCheckTranslationLazyQueryHookResult = ReturnType<typeof useAiCheckTranslationLazyQuery>;
export type AiCheckTranslationSuspenseQueryHookResult = ReturnType<typeof useAiCheckTranslationSuspenseQuery>;
export type AiCheckTranslationQueryResult = Apollo.QueryResult<AiCheckTranslation, AiCheckTranslationVariables>;
export const AiGetTranscriptionDocument = gql`
    query AIGetTranscription($engSentence: String!) {
  ai_getTranscription(input: {engSentence: $engSentence}) {
    ... on GetTranscriptionOutSuccessModel {
      transcription
    }
    ... on GetTranscriptionOutErrorModel {
      error
    }
  }
}
    `;

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
export function useAiGetTranscription(baseOptions: Apollo.QueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables> & ({ variables: AiGetTranscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options);
      }
export function useAiGetTranscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options);
        }
export function useAiGetTranscriptionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AiGetTranscription, AiGetTranscriptionVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AiGetTranscription, AiGetTranscriptionVariables>(AiGetTranscriptionDocument, options);
        }
export type AiGetTranscriptionHookResult = ReturnType<typeof useAiGetTranscription>;
export type AiGetTranscriptionLazyQueryHookResult = ReturnType<typeof useAiGetTranscriptionLazyQuery>;
export type AiGetTranscriptionSuspenseQueryHookResult = ReturnType<typeof useAiGetTranscriptionSuspenseQuery>;
export type AiGetTranscriptionQueryResult = Apollo.QueryResult<AiGetTranscription, AiGetTranscriptionVariables>;
export const Auth_ConfirmEmailDocument = gql`
    mutation Auth_confirmEmail($input: ConfirmEmailInput!) {
  auth_confirmEmail(input: $input)
}
    `;
export type Auth_ConfirmEmailMutationFn = Apollo.MutationFunction<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>;

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
export function useAuth_ConfirmEmail(baseOptions?: Apollo.MutationHookOptions<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>(Auth_ConfirmEmailDocument, options);
      }
export type Auth_ConfirmEmailHookResult = ReturnType<typeof useAuth_ConfirmEmail>;
export type Auth_ConfirmEmailMutationResult = Apollo.MutationResult<Auth_ConfirmEmail>;
export type Auth_ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<Auth_ConfirmEmail, Auth_ConfirmEmailVariables>;
export const Auth_GetMeDocument = gql`
    query Auth_getMe {
  auth_getMe {
    id
    email
  }
}
    `;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options);
      }
export function useAuth_GetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options);
        }
export function useAuth_GetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Auth_GetMe, Auth_GetMeVariables>(Auth_GetMeDocument, options);
        }
export type Auth_GetMeHookResult = ReturnType<typeof useAuth_GetMe>;
export type Auth_GetMeLazyQueryHookResult = ReturnType<typeof useAuth_GetMeLazyQuery>;
export type Auth_GetMeSuspenseQueryHookResult = ReturnType<typeof useAuth_GetMeSuspenseQuery>;
export type Auth_GetMeQueryResult = Apollo.QueryResult<Auth_GetMe, Auth_GetMeVariables>;
export const Auth_LoginDocument = gql`
    mutation Auth_login($input: LoginInput!) {
  auth_login(input: $input) {
    id
    email
  }
}
    `;
export type Auth_LoginMutationFn = Apollo.MutationFunction<Auth_Login, Auth_LoginVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Auth_Login, Auth_LoginVariables>(Auth_LoginDocument, options);
      }
export type Auth_LoginHookResult = ReturnType<typeof useAuth_Login>;
export type Auth_LoginMutationResult = Apollo.MutationResult<Auth_Login>;
export type Auth_LoginMutationOptions = Apollo.BaseMutationOptions<Auth_Login, Auth_LoginVariables>;
export const Auth_Login_With_OAuthDocument = gql`
    mutation Auth_login_with_OAuth($input: LoginWithOAuthInput!) {
  auth_login_with_OAuth(input: $input) {
    id
    email
  }
}
    `;
export type Auth_Login_With_OAuthMutationFn = Apollo.MutationFunction<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>;

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
export function useAuth_Login_With_OAuth(baseOptions?: Apollo.MutationHookOptions<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>(Auth_Login_With_OAuthDocument, options);
      }
export type Auth_Login_With_OAuthHookResult = ReturnType<typeof useAuth_Login_With_OAuth>;
export type Auth_Login_With_OAuthMutationResult = Apollo.MutationResult<Auth_Login_With_OAuth>;
export type Auth_Login_With_OAuthMutationOptions = Apollo.BaseMutationOptions<Auth_Login_With_OAuth, Auth_Login_With_OAuthVariables>;
export const Auth_LogoutDocument = gql`
    mutation Auth_logout {
  auth_logout
}
    `;
export type Auth_LogoutMutationFn = Apollo.MutationFunction<Auth_Logout, Auth_LogoutVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Auth_Logout, Auth_LogoutVariables>(Auth_LogoutDocument, options);
      }
export type Auth_LogoutHookResult = ReturnType<typeof useAuth_Logout>;
export type Auth_LogoutMutationResult = Apollo.MutationResult<Auth_Logout>;
export type Auth_LogoutMutationOptions = Apollo.BaseMutationOptions<Auth_Logout, Auth_LogoutVariables>;
export const Auth_RegisterDocument = gql`
    mutation Auth_register($input: RegisterUserInput!) {
  auth_register(input: $input) {
    id
    email
  }
}
    `;
export type Auth_RegisterMutationFn = Apollo.MutationFunction<Auth_Register, Auth_RegisterVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Auth_Register, Auth_RegisterVariables>(Auth_RegisterDocument, options);
      }
export type Auth_RegisterHookResult = ReturnType<typeof useAuth_Register>;
export type Auth_RegisterMutationResult = Apollo.MutationResult<Auth_Register>;
export type Auth_RegisterMutationOptions = Apollo.BaseMutationOptions<Auth_Register, Auth_RegisterVariables>;
export const Payment_YookassaTopUpBalanceDocument = gql`
    mutation Payment_yookassaTopUpBalance($input: TopUpBalanceWithYooKassaInput!) {
  payment_yookassa_top_up_balance(input: $input) {
    confirmationUrl
  }
}
    `;
export type Payment_YookassaTopUpBalanceMutationFn = Apollo.MutationFunction<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>;

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
export function usePayment_YookassaTopUpBalance(baseOptions?: Apollo.MutationHookOptions<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>(Payment_YookassaTopUpBalanceDocument, options);
      }
export type Payment_YookassaTopUpBalanceHookResult = ReturnType<typeof usePayment_YookassaTopUpBalance>;
export type Payment_YookassaTopUpBalanceMutationResult = Apollo.MutationResult<Payment_YookassaTopUpBalance>;
export type Payment_YookassaTopUpBalanceMutationOptions = Apollo.BaseMutationOptions<Payment_YookassaTopUpBalance, Payment_YookassaTopUpBalanceVariables>;