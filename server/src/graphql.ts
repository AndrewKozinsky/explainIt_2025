
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SubtitlesGenerationStatus {
    idle = "idle",
    pending = "pending",
    processing = "processing",
    done = "done",
    failed = "failed"
}

export interface GetPrivateBookInput {
    id: number;
}

export interface GetBookPublicInput {
    id: number;
}

export interface GetBookChapterInput {
    bookType: string;
    id: number;
    targetLanguageCode?: Nullable<string>;
}

export interface GetPrivateVideoInput {
    id: number;
}

export interface VideoPrivateSubtitlesStatusInput {
    videoId: number;
}

export interface GetPublicVideoInput {
    id: number;
}

export interface GetSentenceTranslationInput {
    sentenceId: number;
    targetLanguageCode: string;
}

export interface GetPhraseTranslationInput {
    sentenceId: number;
    targetLanguageCode: string;
    selectedWordStartOffset: number;
    selectedWordEndOffset: number;
}

export interface GetPhraseTranslationsBySentenceInput {
    sentenceId: number;
    targetLanguageCode: string;
}

export interface GetSentenceChatThreadInput {
    sentenceId: number;
}

export interface GetUniversalPhraseInput {
    phrase: string;
    languageCode: string;
}

export interface GetMyFlashcardsInput {
    languageCode?: Nullable<string>;
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
    amountInKopecks: number;
}

export interface CreatePrivateBookInput {
    author?: Nullable<string>;
    name?: Nullable<string>;
    note?: Nullable<string>;
    languageCode: string;
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
    fileDurationSec?: Nullable<number>;
    languageCode: string;
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
    fileDurationSec?: Nullable<number>;
}

export interface DeletePrivateVideoInput {
    id: number;
}

export interface GenerateSubtitlesForPrivateVideoInput {
    videoId: number;
}

export interface TranslateSentenceInput {
    sentenceId: number;
    sourceLanguageCode?: Nullable<string>;
    targetLanguageCode: string;
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
    targetLanguageCode: string;
    bookName?: Nullable<string>;
    bookAuthor?: Nullable<string>;
    videoName?: Nullable<string>;
    videoYear?: Nullable<string>;
}

export interface CreateSentenceChatThreadInput {
    sentenceId: number;
}

export interface CreateSentenceChatUserMessageInput {
    threadId: number;
    question: string;
}

export interface CreateUniversalPhraseInput {
    phrase: string;
    languageCode: string;
}

export interface CreateUniversalTranscriptionInput {
    universalPhraseId: number;
}

export interface CreateUniversalAudioPronunciationInput {
    universalPhraseId: number;
}

export interface AddFlashcardInput {
    sentencePhraseTranslationId: number;
}

export interface RemoveFlashcardInput {
    flashcardId: number;
}

export interface FetchGrammarConceptsInput {
    sentenceText: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export interface UniversalAudioPronunciationOutModel {
    id: number;
    universalPhraseId: number;
    audioUrl: string;
}

export interface UserOutModel {
    id: number;
    email: string;
    isUserConfirmed: boolean;
    balance: number;
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

export interface GrammarConceptOutModel {
    id: string;
    sourceLanguage: string;
    targetLanguage: string;
    category: string;
    lemma: string;
    title: string;
    slug: string;
    order: number;
}

export interface MissingGrammarConceptOutModel {
    category: string;
    lemma: string;
}

export interface UniversalSentenceOutModel {
    id: number;
    sentenceText: string;
    sourceLanguage: string;
    status: string;
    grammarConcepts: GrammarConceptOutModel[];
    missingGrammarConcepts: MissingGrammarConceptOutModel[];
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
    grammarConcepts?: Nullable<GrammarConceptOutModel[]>;
}

export interface BookPublicOutModel {
    id: number;
    author?: Nullable<string>;
    name: string;
    note: string;
    covers: string[];
    coverBackgroundColor: string;
    languageCode: string;
    freeToUse: boolean;
    chapters: BookChapterLiteOutModel[];
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
    flashcardId?: Nullable<number>;
}

export interface FlashcardOutModel {
    id: number;
    languageCode: string;
    sentenceText: string;
    sentenceTranslation?: Nullable<string>;
    phrase: string;
    phraseStartOffset: number;
    phraseEndOffset: number;
    phraseTranslation?: Nullable<string>;
    phraseTranscription?: Nullable<string>;
    examples: SentencePhraseTranslationExampleOutModel[];
    bookPrivateId?: Nullable<number>;
    bookPublicId?: Nullable<number>;
    videoPrivateId?: Nullable<number>;
    videoPublicId?: Nullable<number>;
    sentencePhraseTranslationId?: Nullable<number>;
    createdAt: string;
}

export interface LanguageOutModel {
    code: string;
    nameRus: string;
    nameEng: string;
}

export interface CreateYooKassaPaymentOutModel {
    confirmationUrl: string;
}

export interface SentenceChatMessageOutModel {
    id: number;
    threadId: number;
    role: string;
    content: string;
    status: string;
    errorMessage?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

export interface SentenceChatThreadOutModel {
    id: number;
    sentenceId: number;
    messages: SentenceChatMessageOutModel[];
    createdAt: string;
    updatedAt: string;
}

export interface TranslateSentenceResultOutModel {
    sentenceId: number;
    translation: string;
}

export interface TranscriptionOutModel {
    id: number;
    universalPhraseId: number;
    ipa?: Nullable<string>;
    pinyin?: Nullable<string>;
}

export interface UniversalPhraseOutModel {
    id: number;
    phrase: string;
    languageCode: string;
    transcription?: Nullable<TranscriptionOutModel>;
    audioPronunciation?: Nullable<UniversalAudioPronunciationOutModel>;
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
    fileDurationSec?: Nullable<number>;
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
    fileDurationSec?: Nullable<number>;
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
    fileDurationSec?: Nullable<number>;
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

export interface VideoPrivateSubtitlesStatusOutModel {
    videoId: number;
    status: SubtitlesGenerationStatus;
    error?: Nullable<string>;
    startedAt?: Nullable<string>;
    jobId?: Nullable<string>;
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

export interface IQuery {
    auth_getMe(): UserOutModel | Promise<UserOutModel>;
    book_user_books(): BookPrivateOutModel[] | Promise<BookPrivateOutModel[]>;
    book_get(input: GetPrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_public_get_books(): BookPublicOutModel[] | Promise<BookPublicOutModel[]>;
    book_public_get_book(input: GetBookPublicInput): BookPublicOutModel | Promise<BookPublicOutModel>;
    book_chapter_get(input: GetBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    video_private_user_videos(): VideoPrivateLiteOutModel[] | Promise<VideoPrivateLiteOutModel[]>;
    video_private_get(input: GetPrivateVideoInput): VideoPrivateOutModel | Promise<VideoPrivateOutModel>;
    video_private_get_subtitles_generation_status(input: VideoPrivateSubtitlesStatusInput): VideoPrivateSubtitlesStatusOutModel | Promise<VideoPrivateSubtitlesStatusOutModel>;
    video_public_get_videos(): VideoPublicLiteOutModel[] | Promise<VideoPublicLiteOutModel[]>;
    video_public_get(input: GetPublicVideoInput): VideoPublicOutModel | Promise<VideoPublicOutModel>;
    translate_get_sentence_translation(input: GetSentenceTranslationInput): Nullable<TranslateSentenceResultOutModel> | Promise<Nullable<TranslateSentenceResultOutModel>>;
    translate_get_phrase_translation(input: GetPhraseTranslationInput): Nullable<SentencePhraseTranslationOutModel> | Promise<Nullable<SentencePhraseTranslationOutModel>>;
    translate_get_phrase_translations_by_sentence(input: GetPhraseTranslationsBySentenceInput): SentencePhraseTranslationOutModel[] | Promise<SentencePhraseTranslationOutModel[]>;
    sentence_chat_get_thread(input: GetSentenceChatThreadInput): Nullable<SentenceChatThreadOutModel> | Promise<Nullable<SentenceChatThreadOutModel>>;
    universal_phrase_get(input: GetUniversalPhraseInput): UniversalPhraseOutModel | Promise<UniversalPhraseOutModel>;
    language_get_languages(): LanguageOutModel[] | Promise<LanguageOutModel[]>;
    flashcard_get_my(input: GetMyFlashcardsInput): FlashcardOutModel[] | Promise<FlashcardOutModel[]>;
}

export interface IMutation {
    auth_register(input: RegisterUserInput): UserOutModel | Promise<UserOutModel>;
    auth_login(input: LoginInput): UserOutModel | Promise<UserOutModel>;
    auth_login_with_OAuth(input: LoginWithOAuthInput): UserOutModel | Promise<UserOutModel>;
    auth_confirmEmail(input: ConfirmEmailInput): boolean | Promise<boolean>;
    auth_resendConfirmationEmail(input: ResendConfirmationEmailInput): boolean | Promise<boolean>;
    auth_logout(): boolean | Promise<boolean>;
    payment_yookassa_top_up_balance(input: TopUpBalanceWithYooKassaInput): CreateYooKassaPaymentOutModel | Promise<CreateYooKassaPaymentOutModel>;
    book_create(input: CreatePrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_update(input: UpdatePrivateBookInput): BookPrivateOutModel | Promise<BookPrivateOutModel>;
    book_delete(input: DeletePrivateBookInput): boolean | Promise<boolean>;
    book_chapter_create(input: CreateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_update(input: UpdateBookChapterInput): BookChapterOutModel | Promise<BookChapterOutModel>;
    book_chapter_delete(input: DeleteBookChapterInput): boolean | Promise<boolean>;
    video_private_create(input: CreatePrivateVideoInput): CreateVideoPrivateOutModel | Promise<CreateVideoPrivateOutModel>;
    video_private_update(input: UpdatePrivateVideoInput): UpdateVideoPrivateOutModel | Promise<UpdateVideoPrivateOutModel>;
    video_private_delete(input: DeletePrivateVideoInput): boolean | Promise<boolean>;
    video_private_generate_subtitles(input: GenerateSubtitlesForPrivateVideoInput): VideoPrivateSubtitlesStatusOutModel | Promise<VideoPrivateSubtitlesStatusOutModel>;
    translate_translate_sentence(input: TranslateSentenceInput): TranslateSentenceResultOutModel | Promise<TranslateSentenceResultOutModel>;
    translate_translate_phrase(input: TranslatePhraseInput): SentencePhraseTranslationOutModel | Promise<SentencePhraseTranslationOutModel>;
    sentence_chat_create_thread(input: CreateSentenceChatThreadInput): SentenceChatThreadOutModel | Promise<SentenceChatThreadOutModel>;
    sentence_chat_create_user_message(input: CreateSentenceChatUserMessageInput): SentenceChatMessageOutModel | Promise<SentenceChatMessageOutModel>;
    universal_phrase_create(input: CreateUniversalPhraseInput): UniversalPhraseOutModel | Promise<UniversalPhraseOutModel>;
    create_transcription(input: CreateUniversalTranscriptionInput): TranscriptionOutModel | Promise<TranscriptionOutModel>;
    create_audio_pronunciation(input: CreateUniversalAudioPronunciationInput): UniversalAudioPronunciationOutModel | Promise<UniversalAudioPronunciationOutModel>;
    flashcard_add(input: AddFlashcardInput): FlashcardOutModel | Promise<FlashcardOutModel>;
    flashcard_remove(input: RemoveFlashcardInput): boolean | Promise<boolean>;
    grammar_concept_fetch(input: FetchGrammarConceptsInput): UniversalSentenceOutModel | Promise<UniversalSentenceOutModel>;
}

type Nullable<T> = T | null;
