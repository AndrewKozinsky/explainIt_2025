
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CheckTranslationInput {
    rusSentence: string;
    engSentence: string;
}

export interface GetTranscriptionInput {
    engSentence: string;
}

export interface GetSentenceAndPhraseAnalysesInput {
    context: string;
    sentence: string;
    phrase: string;
}

export interface GetBookChapterInput {
    id: number;
}

export interface RegisterUserInput {
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginWithOAuthInput {
    providerType: string;
    code: string;
}

export interface ConfirmEmailInput {
    code: string;
}

export interface ResendConfirmationEmailInput {
    email: string;
}

export interface TopUpBalanceWithYooKassaInput {
    amount: number;
}

export interface CreateBookInput {
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
}

export interface UpdateBookInput {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
}

export interface DeleteBookInput {
    id: number;
}

export interface CreateBookChapterInput {
    bookId: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    content?: Nullable<string>;
    note?: Nullable<string>;
}

export interface UpdateBookChapterInput {
    id: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    content?: Nullable<string>;
    note?: Nullable<string>;
    convertContentIntoStructure?: Nullable<boolean>;
}

export interface DeleteBookChapterInput {
    id: number;
}

export interface SentenceAndPhraseAnalysesOutModel {
    id: number;
}

export interface UserOutModel {
    id: number;
    email: string;
    isUserConfirmed: boolean;
    balance: number;
}

export interface BookChapterOutModel {
    id: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    content?: Nullable<string>;
    note?: Nullable<string>;
    book: BookLiteOutModel;
}

export interface BookChapterLiteOutModel {
    id: number;
    bookId: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    note?: Nullable<string>;
}

export interface BookOutModel {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
    userId: number;
    chapters: BookChapterLiteOutModel[];
}

export interface BookLiteOutModel {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
    userId: number;
}

export interface TopUpBalanceWithYooKassaOutModel {
    confirmationUrl: string;
}

export interface IQuery {
    ai_checkTranslation(input: CheckTranslationInput): CheckTranslationOutModel | Promise<CheckTranslationOutModel>;
    ai_getTranscription(input: GetTranscriptionInput): GetTranscriptionOutModel | Promise<GetTranscriptionOutModel>;
    ai_GetSentenceAndPhraseAnalyses(input: GetSentenceAndPhraseAnalysesInput): SentenceAndPhraseAnalysesOutModel | Promise<SentenceAndPhraseAnalysesOutModel>;
    auth_getMe(): UserOutModel | Promise<UserOutModel>;
    book_user_books(): BookOutModel[] | Promise<BookOutModel[]>;
    book_chapter_get(input: GetBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
}

export interface CheckTranslationOutSuccessModel {
    correct: boolean;
    analysis: string;
}

export interface CheckTranslationOutErrorModel {
    error: string;
}

export interface GetTranscriptionOutSuccessModel {
    transcription: string;
}

export interface GetTranscriptionOutErrorModel {
    error: string;
}

export interface IMutation {
    auth_register(input: RegisterUserInput): UserOutModel | Promise<UserOutModel>;
    auth_login(input: LoginInput): UserOutModel | Promise<UserOutModel>;
    auth_login_with_OAuth(input: LoginWithOAuthInput): UserOutModel | Promise<UserOutModel>;
    auth_confirmEmail(input: ConfirmEmailInput): boolean | Promise<boolean>;
    auth_resendConfirmationEmail(input: ResendConfirmationEmailInput): boolean | Promise<boolean>;
    auth_logout(): boolean | Promise<boolean>;
    payment_yookassa_top_up_balance(input: TopUpBalanceWithYooKassaInput): TopUpBalanceWithYooKassaOutModel | Promise<TopUpBalanceWithYooKassaOutModel>;
    book_create(input: CreateBookInput): BookOutModel | Promise<BookOutModel>;
    book_update(input: UpdateBookInput): BookOutModel | Promise<BookOutModel>;
    book_delete(input: DeleteBookInput): boolean | Promise<boolean>;
    book_chapter_create(input: CreateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_update(input: UpdateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_delete(input: DeleteBookChapterInput): boolean | Promise<boolean>;
}

export type CheckTranslationOutModel = CheckTranslationOutSuccessModel | CheckTranslationOutErrorModel;
export type GetTranscriptionOutModel = GetTranscriptionOutSuccessModel | GetTranscriptionOutErrorModel;
type Nullable<T> = T | null;
