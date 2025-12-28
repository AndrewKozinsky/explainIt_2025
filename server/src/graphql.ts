
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

export interface GetBookInput {
    id: number;
}

export interface GetBookPublicInput {
    id: number;
}

export interface GetBookChapterInput {
    bookType: string;
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
    bookType: string;
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
}

export interface DeleteBookChapterInput {
    id: number;
}

export interface AnalysePhraseInput {
    bookChapterId: number;
    bookAuthor?: Nullable<string>;
    bookName?: Nullable<string>;
    context: string;
    sentenceId: number;
    sentence: string;
    phrase: string;
    phraseWordsIdx: number[];
}

export interface TranslateSentencesInput {
    bookAuthor?: Nullable<string>;
    bookName?: Nullable<string>;
    sentences: string[];
}

export interface DeleteBookChapterPhrasesInput {
    bookChapterId: number;
}

export interface CreatePrivateVideoInput {
    name?: Nullable<string>;
    subtitles?: Nullable<string>;
    fileName?: Nullable<string>;
    fileMimeType?: Nullable<string>;
}

export interface UpdatePrivateVideoInput {
    id: number;
    name?: Nullable<string>;
    subtitles?: Nullable<string>;
    fileName?: Nullable<string>;
    fileMimeType?: Nullable<string>;
}

export interface BookChapterPhraseOutModel {
    id: number;
    sentenceId: number;
    sentence: string;
    transcription: string;
    phrase: string;
    phraseWordsIdx: number[];
    translation: string;
    analysis: string;
    examples: PhraseExample[];
}

export interface PhraseExample {
    id: number;
    sentence: string;
    translation: string;
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
    userId?: Nullable<number>;
}

export interface BookChapterLiteOutModel {
    id: number;
    bookId: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    note?: Nullable<string>;
}

export interface BookChapterOutModel {
    id: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    content?: Nullable<string>;
    note?: Nullable<string>;
    book: BookLiteOutModel;
    phrases: BookChapterPhraseOutModel[];
}

export interface BookPublicOutModel {
    id: number;
    author: string;
    name: string;
    note: string;
    cover: string;
    chapters: BookChapterLiteOutModel[];
}

export interface CreateVideoPrivateOutModel {
    id: number;
    name?: Nullable<string>;
    subtitles?: Nullable<string>;
    userId: number;
    uploadUrl?: Nullable<string>;
}

export interface UpdateVideoPrivateOutModel {
    id: number;
    name?: Nullable<string>;
    subtitles?: Nullable<string>;
    userId: number;
    uploadUrl?: Nullable<string>;
}

export interface UserOutModel {
    id: number;
    email: string;
    isUserConfirmed: boolean;
    balance: number;
}

export interface BookChapterTranslateOfSentencesOutModel {
    translates: string[];
}

export interface TopUpBalanceWithYooKassaOutModel {
    confirmationUrl: string;
}

export interface IQuery {
    ai_checkTranslation(input: CheckTranslationInput): CheckTranslationOutModel | Promise<CheckTranslationOutModel>;
    ai_getTranscription(input: GetTranscriptionInput): GetTranscriptionOutModel | Promise<GetTranscriptionOutModel>;
    auth_getMe(): UserOutModel | Promise<UserOutModel>;
    book_user_books(): BookOutModel[] | Promise<BookOutModel[]>;
    book_get(input: GetBookInput): BookOutModel | Promise<BookOutModel>;
    book_public_get_books(): BookPublicOutModel[] | Promise<BookPublicOutModel[]>;
    book_public_get_book(input: GetBookPublicInput): BookPublicOutModel | Promise<BookPublicOutModel>;
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
    book_chapter_AnalysePhrase(input: AnalysePhraseInput): BookChapterPhraseOutModel | Promise<BookChapterPhraseOutModel>;
    book_chapter_TranslateSentences(input: TranslateSentencesInput): BookChapterTranslateOfSentencesOutModel | Promise<BookChapterTranslateOfSentencesOutModel>;
    book_chapter_DeleteBookChapterPhrases(input: DeleteBookChapterPhrasesInput): boolean | Promise<boolean>;
    video_private_create(input: CreatePrivateVideoInput): CreateVideoPrivateOutModel | Promise<CreateVideoPrivateOutModel>;
    video_private_update(input: UpdatePrivateVideoInput): UpdateVideoPrivateOutModel | Promise<UpdateVideoPrivateOutModel>;
}

export type CheckTranslationOutModel = CheckTranslationOutSuccessModel | CheckTranslationOutErrorModel;
export type GetTranscriptionOutModel = GetTranscriptionOutSuccessModel | GetTranscriptionOutErrorModel;
type Nullable<T> = T | null;
