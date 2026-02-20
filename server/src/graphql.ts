
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

export interface GetPrivateVideoInput {
    id: number;
}

export interface GetPublicVideoInput {
    id: number;
}

export interface GetSentenceTranslationInput {
    id: number;
}

export interface GetSentenceTranslationsBySentenceIdInput {
    sentenceId: number;
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

export interface BuySubscriptionWithYooKassaInput {
    tariffId: number;
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

export interface CreatePrivateVideoInput {
    name?: Nullable<string>;
    originalContent?: Nullable<string>;
    fileSizeMb?: Nullable<number>;
}

export interface UpdatePrivateVideoInput {
    id: number;
    name?: Nullable<string>;
    originalContent?: Nullable<string>;
    fileName?: Nullable<string>;
    fileMimeType?: Nullable<string>;
    isFileUploaded?: Nullable<boolean>;
    fileSizeMb?: Nullable<number>;
}

export interface DeletePrivateVideoInput {
    id: number;
}

export interface BookOutModel {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    languageCode: string;
    note?: Nullable<string>;
    userId: number;
    chapters: BookChapterLiteOutModel[];
}

export interface BookLiteOutModel {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    languageCode: string;
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
    note?: Nullable<string>;
    content?: Nullable<string>;
    sentences?: Nullable<SentenceOutModel[]>;
    book: BookLiteOutModel;
}

export interface SentenceOutModel {
    id: number;
    startOffset: number;
    length: number;
}

export interface BookPublicOutModel {
    id: number;
    author: string;
    name: string;
    note: string;
    covers: string[];
    languageCode: string;
    freeToUse: boolean;
    chapters: BookChapterLiteOutModel[];
}

export interface SentenceTranslationOutModel {
    id: number;
    sentenceId: number;
    translation: string;
    analysis?: Nullable<string>;
    createdAt: string;
}

export interface TariffOutModel {
    id: number;
    code: string;
    name: string;
    price: number;
    durationDays: number;
    includedBalance: number;
    includedFileStorageMb: number;
    createdAt: DateTime;
}

export interface CreateVideoPrivateOutModel {
    id: number;
    name?: Nullable<string>;
    year?: Nullable<number>;
    languageCode: string;
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
    contentType: string;
    userId: number;
}

export interface UpdateVideoPrivateOutModel {
    id: number;
    name?: Nullable<string>;
    year?: Nullable<number>;
    languageCode: string;
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
    contentType: string;
    userId: number;
    uploadUrl?: Nullable<string>;
    fileSizeMb?: Nullable<number>;
}

export interface VideoPrivateLiteOutModel {
    id: number;
    userId: number;
    name?: Nullable<string>;
    year?: Nullable<number>;
    languageCode: string;
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
    contentType: string;
    fileName?: Nullable<string>;
    fileS3Key?: Nullable<string>;
    fileUrl?: Nullable<string>;
    isFileUploaded: boolean;
    fileSizeMb: number;
}

export interface VideoPrivateOutModel {
    id: number;
    userId: number;
    name?: Nullable<string>;
    year?: Nullable<number>;
    languageCode: string;
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
    contentType: string;
    fileName?: Nullable<string>;
    fileS3Key?: Nullable<string>;
    fileUrl?: Nullable<string>;
    isFileUploaded: boolean;
    fileSizeMb: number;
    sentences?: Nullable<VideoPrivateSentenceOutModel[]>;
    subtitles?: Nullable<VideoPrivateSubtitleOutModel[]>;
    subtitleSentenceInit?: Nullable<SubtitleSentenceInitOutModel[]>;
}

export interface VideoPrivateSentenceOutModel {
    id: number;
    sentenceTranslations?: Nullable<SentenceTranslationLiteOutModel[]>;
    startOffset: number;
    length: number;
    orderIndex: number;
}

export interface VideoPrivateSubtitleOutModel {
    id: number;
    startTimeMs: number;
    endTimeMs: number;
    startOffset: number;
    length: number;
    orderIndex: number;
}

export interface SubtitleSentenceInitOutModel {
    id: number;
    subtitleId: number;
    sentenceId: number;
    startOffset: number;
    length: number;
}

export interface SentenceTranslationLiteOutModel {
    id: number;
    translation: string;
}

export interface VideoPublicOutModel {
    id: number;
    name: string;
    year?: Nullable<number>;
    languageCode: string;
    note?: Nullable<string>;
    covers: string[];
    originalContent: string;
    processedContent: string;
    contentType: string;
    fileName: string;
    fileS3Key: string;
    fileUrl: string;
    freeToUse: boolean;
    sentences?: Nullable<VideoPublicSentenceOutModel[]>;
    subtitles?: Nullable<VideoPublicSubtitleOutModel[]>;
    subtitleSentenceInit?: Nullable<SubtitleSentenceInitOutModel[]>;
}

export interface VideoPublicSentenceOutModel {
    id: number;
    sentenceTranslations?: Nullable<SentenceTranslationLiteOutModel[]>;
    startOffset: number;
    length: number;
    orderIndex: number;
}

export interface VideoPublicSubtitleOutModel {
    id: number;
    startTimeMs: number;
    endTimeMs: number;
    startOffset: number;
    length: number;
    orderIndex: number;
}

export interface VideoPublicLiteOutModel {
    id: number;
    name: string;
    year?: Nullable<number>;
    languageCode: string;
    note?: Nullable<string>;
    covers: string[];
    originalContent: string;
    processedContent: string;
    contentType: string;
    fileName: string;
    fileS3Key: string;
    fileUrl: string;
    freeToUse: boolean;
}

export interface CurrentSubscriptionOutModel {
    tariffId: number;
    tariffCode: string;
    tariffName: string;
    pricePaid: number;
    balance: number;
    includedFileStorageMb: number;
    startsAt: string;
    endsAt: string;
}

export interface UserOutModel {
    id: number;
    email: string;
    isUserConfirmed: boolean;
    balance: number;
    currentSubscription?: Nullable<CurrentSubscriptionOutModel>;
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
    video_private_user_videos(): VideoPrivateLiteOutModel[] | Promise<VideoPrivateLiteOutModel[]>;
    video_private_get(input: GetPrivateVideoInput): VideoPrivateOutModel | Promise<VideoPrivateOutModel>;
    video_public_get_videos(): VideoPublicLiteOutModel[] | Promise<VideoPublicLiteOutModel[]>;
    video_public_get(input: GetPublicVideoInput): VideoPublicOutModel | Promise<VideoPublicOutModel>;
    sentence_translation_get(input: GetSentenceTranslationInput): SentenceTranslationOutModel | Promise<SentenceTranslationOutModel>;
    sentence_translation_get_by_sentence_id(input: GetSentenceTranslationsBySentenceIdInput): SentenceTranslationOutModel[] | Promise<SentenceTranslationOutModel[]>;
    tariff_get_tariffs(): TariffOutModel[] | Promise<TariffOutModel[]>;
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
    payment_yookassa_buy_subscription(input: BuySubscriptionWithYooKassaInput): TopUpBalanceWithYooKassaOutModel | Promise<TopUpBalanceWithYooKassaOutModel>;
    book_create(input: CreateBookInput): BookOutModel | Promise<BookOutModel>;
    book_update(input: UpdateBookInput): BookOutModel | Promise<BookOutModel>;
    book_delete(input: DeleteBookInput): boolean | Promise<boolean>;
    book_chapter_create(input: CreateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_update(input: UpdateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_delete(input: DeleteBookChapterInput): boolean | Promise<boolean>;
    video_private_create(input: CreatePrivateVideoInput): CreateVideoPrivateOutModel | Promise<CreateVideoPrivateOutModel>;
    video_private_update(input: UpdatePrivateVideoInput): UpdateVideoPrivateOutModel | Promise<UpdateVideoPrivateOutModel>;
    video_private_delete(input: DeletePrivateVideoInput): boolean | Promise<boolean>;
}

export type DateTime = any;
export type CheckTranslationOutModel = CheckTranslationOutSuccessModel | CheckTranslationOutErrorModel;
export type GetTranscriptionOutModel = GetTranscriptionOutSuccessModel | GetTranscriptionOutErrorModel;
type Nullable<T> = T | null;
