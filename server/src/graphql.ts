
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface GetPrivateBookInput {
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

export interface GetWordInput {
    word: string;
    languageCode: string;
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

export interface BuySubscriptionWithYooKassaInput {
    tariffId: number;
}

export interface CreatePrivateBookInput {
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
    languageCode?: Nullable<string>;
}

export interface UpdatePrivateBookInput {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    languageCode?: Nullable<string>;
    note?: Nullable<string>;
}

export interface DeletePrivateBookInput {
    id: number;
}

export interface CreateBookChapterInput {
    bookType: string;
    bookId: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    originalContent?: Nullable<string>;
    note?: Nullable<string>;
}

export interface UpdateBookChapterInput {
    id: number;
    name?: Nullable<string>;
    header?: Nullable<string>;
    originalContent?: Nullable<string>;
    note?: Nullable<string>;
}

export interface DeleteBookChapterInput {
    id: number;
}

export interface CreatePrivateVideoInput {
    name?: Nullable<string>;
    originalContent?: Nullable<string>;
    fileSizeMb?: Nullable<number>;
    languageCode?: Nullable<string>;
}

export interface UpdatePrivateVideoInput {
    id: number;
    name?: Nullable<string>;
    languageCode?: Nullable<string>;
    originalContent?: Nullable<string>;
    fileName?: Nullable<string>;
    fileMimeType?: Nullable<string>;
    isFileUploaded?: Nullable<boolean>;
    fileSizeMb?: Nullable<number>;
}

export interface DeletePrivateVideoInput {
    id: number;
}

export interface TranslateSentenceInput {
    sentenceId: number;
    text: string;
    sourceLanguageCode?: Nullable<string>;
    targetLanguageCode?: Nullable<string>;
    bookName?: Nullable<string>;
    bookAuthor?: Nullable<string>;
    videoName?: Nullable<string>;
    videoYear?: Nullable<string>;
}

export interface TranslatePhraseInput {
    sentenceId: number;
    text: string;
    selectedWord: string;
    selectedWordStartOffset: number;
    selectedWordEndOffset: number;
    sourceLanguageCode?: Nullable<string>;
    targetLanguageCode?: Nullable<string>;
    bookName?: Nullable<string>;
    bookAuthor?: Nullable<string>;
    videoName?: Nullable<string>;
    videoYear?: Nullable<string>;
}

export interface CreateWordInput {
    word: string;
    languageCode: string;
}

export interface CreateTranscriptionInput {
    wordId: number;
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
    currentSubscription?: Nullable<CurrentSubscriptionOutModel>;
}

export interface BookPrivateOutModel {
    id: number;
    author?: Nullable<string>;
    name?: Nullable<string>;
    languageCode?: Nullable<string>;
    note?: Nullable<string>;
    userId: number;
    freeToUse: boolean;
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
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
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
    coverBackgroundColor: string;
    languageCode: string;
    freeToUse: boolean;
    chapters: BookChapterLiteOutModel[];
}

export interface LanguageOutModel {
    code: string;
    nameRus: string;
    nameEng: string;
}

export interface BuySubscriptionWithYooKassaOutModel {
    confirmationUrl: string;
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

export interface TranscriptionOutModel {
    id: number;
    wordId: number;
    ipa?: Nullable<string>;
    pinyin?: Nullable<string>;
}

export interface SentencePhraseTranslationExampleOutModel {
    text: string;
    translate: string;
}

export interface SentencePhraseTranslationOutModel {
    id: number;
    sentenceId: number;
    phrase: string;
    phraseStartOffset: number;
    phraseEndOffset: number;
    translate?: Nullable<string>;
    examples: SentencePhraseTranslationExampleOutModel[];
    status: string;
    errorMessage?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

export interface TranslateSentenceResultOutModel {
    sentenceId: number;
    translation: string;
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
    languageCode?: Nullable<string>;
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
    languageCode?: Nullable<string>;
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
    languageCode?: Nullable<string>;
    originalContent?: Nullable<string>;
    processedContent?: Nullable<string>;
    contentType: string;
    fileName?: Nullable<string>;
    fileS3Key?: Nullable<string>;
    fileUrl?: Nullable<string>;
    isFileUploaded: boolean;
    fileSizeMb: number;
    freeToUse: boolean;
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
    year: number;
    languageCode: string;
    note: string;
    covers: string[];
    coverBackgroundColor: string;
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
    year: number;
    languageCode: string;
    note: string;
    covers: string[];
    coverBackgroundColor: string;
    originalContent: string;
    processedContent: string;
    contentType: string;
    fileName: string;
    fileS3Key: string;
    fileUrl: string;
    freeToUse: boolean;
}

export interface WordOutModel {
    id: number;
    word: string;
    languageCode: string;
    transcription?: Nullable<TranscriptionOutModel>;
}

export interface IQuery {
    auth_getMe(): UserOutModel | Promise<UserOutModel>;
    book_user_books(): BookPrivateOutModel[] | Promise<BookPrivateOutModel[]>;
    book_get(input: GetPrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_public_get_books(): BookPublicOutModel[] | Promise<BookPublicOutModel[]>;
    book_public_get_book(input: GetBookPublicInput): BookPublicOutModel | Promise<BookPublicOutModel>;
    book_chapter_get(input: GetBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    video_private_user_videos(): VideoPrivateLiteOutModel[] | Promise<VideoPrivateLiteOutModel[]>;
    video_private_get(input: GetPrivateVideoInput): VideoPrivateOutModel | Promise<VideoPrivateOutModel>;
    video_public_get_videos(): VideoPublicLiteOutModel[] | Promise<VideoPublicLiteOutModel[]>;
    video_public_get(input: GetPublicVideoInput): VideoPublicOutModel | Promise<VideoPublicOutModel>;
    tariff_get_tariffs(): TariffOutModel[] | Promise<TariffOutModel[]>;
    word_get(input: GetWordInput): WordOutModel | Promise<WordOutModel>;
    language_get_languages(): LanguageOutModel[] | Promise<LanguageOutModel[]>;
}

export interface IMutation {
    auth_register(input: RegisterUserInput): UserOutModel | Promise<UserOutModel>;
    auth_login(input: LoginInput): UserOutModel | Promise<UserOutModel>;
    auth_login_with_OAuth(input: LoginWithOAuthInput): UserOutModel | Promise<UserOutModel>;
    auth_confirmEmail(input: ConfirmEmailInput): boolean | Promise<boolean>;
    auth_resendConfirmationEmail(input: ResendConfirmationEmailInput): boolean | Promise<boolean>;
    auth_logout(): boolean | Promise<boolean>;
    payment_yookassa_buy_subscription(input: BuySubscriptionWithYooKassaInput): BuySubscriptionWithYooKassaOutModel | Promise<BuySubscriptionWithYooKassaOutModel>;
    book_create(input: CreatePrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_update(input: UpdatePrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_delete(input: DeletePrivateBookInput): boolean | Promise<boolean>;
    book_chapter_create(input: CreateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_update(input: UpdateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_delete(input: DeleteBookChapterInput): boolean | Promise<boolean>;
    video_private_create(input: CreatePrivateVideoInput): CreateVideoPrivateOutModel | Promise<CreateVideoPrivateOutModel>;
    video_private_update(input: UpdatePrivateVideoInput): UpdateVideoPrivateOutModel | Promise<UpdateVideoPrivateOutModel>;
    video_private_delete(input: DeletePrivateVideoInput): boolean | Promise<boolean>;
    translate_translate_sentence(input: TranslateSentenceInput): TranslateSentenceResultOutModel | Promise<TranslateSentenceResultOutModel>;
    translate_translate_phrase(input: TranslatePhraseInput): SentencePhraseTranslationOutModel | Promise<SentencePhraseTranslationOutModel>;
    word_create(input: CreateWordInput): WordOutModel | Promise<WordOutModel>;
    create_transcription(input: CreateTranscriptionInput): TranscriptionOutModel | Promise<TranscriptionOutModel>;
}

export type DateTime = any;
type Nullable<T> = T | null;
