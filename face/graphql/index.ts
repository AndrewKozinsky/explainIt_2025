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

export type AddFlashcardInput = {
  /** SentencePhraseTranslation id */
  sentencePhraseTranslationId: Scalars['Int']['input'];
};

export type BookChapterLiteOutModel = {
  __typename?: 'BookChapterLiteOutModel';
  bookId: Scalars['Int']['output'];
  header?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
};

export type BookChapterOutModel = {
  __typename?: 'BookChapterOutModel';
  book: BookLiteOutModel;
  header?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  processedContent?: Maybe<Scalars['String']['output']>;
  sentences?: Maybe<Array<SentenceOutModel>>;
};

export type BookLiteOutModel = {
  __typename?: 'BookLiteOutModel';
  author?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type BookPrivateOutModel = {
  __typename?: 'BookPrivateOutModel';
  author?: Maybe<Scalars['String']['output']>;
  chapters: Array<BookChapterLiteOutModel>;
  coverUrl?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileS3Key?: Maybe<Scalars['String']['output']>;
  freeToUse: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isFileUploaded: Scalars['Boolean']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  uploadUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
};

export type BookPublicOutModel = {
  __typename?: 'BookPublicOutModel';
  author?: Maybe<Scalars['String']['output']>;
  chapters: Array<BookChapterLiteOutModel>;
  coverBackgroundColor: Scalars['String']['output'];
  covers: Array<Scalars['String']['output']>;
  freeToUse: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note: Scalars['String']['output'];
};

export type ConfirmEmailInput = {
  /** User email */
  code: Scalars['String']['input'];
};

export type CreateBookChapterInput = {
  /** Book id */
  bookId: Scalars['Int']['input'];
  /** Book type: public or private */
  bookType: Scalars['String']['input'];
  /** Header on the chapter */
  header?: InputMaybe<Scalars['String']['input']>;
  /** Name on the chapter (chapter 1) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Note about this chapter */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Content of the chapter */
  originalContent?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePrivateBookInput = {
  /** Author */
  author?: InputMaybe<Scalars['String']['input']>;
  /** Language code */
  languageCode: Scalars['String']['input'];
  /** Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Note */
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePrivateVideoInput = {
  /** File duration in seconds */
  fileDurationSec?: InputMaybe<Scalars['Int']['input']>;
  /** File size in MB */
  fileSizeMb?: InputMaybe<Scalars['Int']['input']>;
  /** Language code */
  languageCode: Scalars['String']['input'];
  /** Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Text */
  originalContent?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSentenceChatThreadInput = {
  /** Sentence id */
  sentenceId: Scalars['Int']['input'];
};

export type CreateSentenceChatUserMessageInput = {
  /** User question in markdown-free plain text */
  question: Scalars['String']['input'];
  /** Sentence chat thread id */
  threadId: Scalars['Int']['input'];
};

export type CreateUniversalAudioPronunciationInput = {
  /** Universal phrase id to create audio pronunciation for */
  universalPhraseId: Scalars['Int']['input'];
};

export type CreateUniversalPhraseInput = {
  /** Source language code */
  sourceLanguageCode: Scalars['String']['input'];
  /** Phrase or sentence text */
  text: Scalars['String']['input'];
};

export type CreateUniversalTranscriptionInput = {
  /** Universal phrase id */
  universalPhraseId: Scalars['Int']['input'];
};

export type CreateVideoPrivateOutModel = {
  __typename?: 'CreateVideoPrivateOutModel';
  contentType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  processedContent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type CreateYooKassaPaymentOutModel = {
  __typename?: 'CreateYooKassaPaymentOutModel';
  confirmationUrl: Scalars['String']['output'];
};

export type DeleteBookChapterInput = {
  /** BookChapter id */
  id: Scalars['Int']['input'];
};

export type DeletePrivateBookInput = {
  /** Book id */
  id: Scalars['Int']['input'];
};

export type DeletePrivateVideoInput = {
  /** Video id */
  id: Scalars['Int']['input'];
};

export type FetchGrammarConceptsInput = {
  sentenceText: Scalars['String']['input'];
  sourceLanguage: Scalars['String']['input'];
  targetLanguage: Scalars['String']['input'];
};

export type FlashcardOutModel = {
  __typename?: 'FlashcardOutModel';
  bookPrivateId?: Maybe<Scalars['Int']['output']>;
  bookPublicId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  examples: Array<SentencePhraseTranslationExampleOutModel>;
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  phrase: Scalars['String']['output'];
  phraseEndOffset: Scalars['Int']['output'];
  phraseStartOffset: Scalars['Int']['output'];
  phraseTranscription?: Maybe<Scalars['String']['output']>;
  phraseTranslation?: Maybe<Scalars['String']['output']>;
  sentencePhraseTranslationId?: Maybe<Scalars['Int']['output']>;
  sentenceText: Scalars['String']['output'];
  sentenceTranslation?: Maybe<Scalars['String']['output']>;
  videoPrivateId?: Maybe<Scalars['Int']['output']>;
  videoPublicId?: Maybe<Scalars['Int']['output']>;
};

export type GenerateSubtitlesForPrivateVideoInput = {
  /** Id of the private video to generate subtitles for */
  videoId: Scalars['Int']['input'];
};

export type GetBookChapterInput = {
  /** Book type: public or private */
  bookType: Scalars['String']['input'];
  /** BookChapter id */
  id: Scalars['Int']['input'];
  /** Target language to filter grammar concepts */
  targetLanguageCode?: InputMaybe<Scalars['String']['input']>;
};

export type GetBookPublicInput = {
  /** Book id */
  id: Scalars['Int']['input'];
};

export type GetMyFlashcardsInput = {
  /** Optional language filter */
  languageCode?: InputMaybe<Scalars['String']['input']>;
};

export type GetPhraseTranslationInput = {
  /** Selected word end offset in sentence (end-exclusive) */
  selectedWordEndOffset: Scalars['Float']['input'];
  /** Selected word start offset in sentence */
  selectedWordStartOffset: Scalars['Float']['input'];
  /** Sentence id */
  sentenceId: Scalars['Float']['input'];
  /** Target language code */
  targetLanguageCode: Scalars['String']['input'];
};

export type GetPhraseTranslationsBySentenceInput = {
  /** Sentence id */
  sentenceId: Scalars['Float']['input'];
  /** Target language code */
  targetLanguageCode: Scalars['String']['input'];
};

export type GetPrivateBookInput = {
  /** Book id */
  id: Scalars['Int']['input'];
};

export type GetPrivateVideoInput = {
  /** Video id */
  id: Scalars['Int']['input'];
  /** Target language for grammar concepts */
  targetLanguageCode?: InputMaybe<Scalars['String']['input']>;
};

export type GetPublicVideoInput = {
  /** Video id */
  id: Scalars['Int']['input'];
  /** Target language for grammar concepts */
  targetLanguageCode?: InputMaybe<Scalars['String']['input']>;
};

export type GetSentenceChatThreadInput = {
  /** Sentence id */
  sentenceId: Scalars['Int']['input'];
};

export type GetSentenceTranslationInput = {
  /** Sentence id */
  sentenceId: Scalars['Float']['input'];
  /** Target language code */
  targetLanguageCode: Scalars['String']['input'];
};

export type GetUniversalPhraseInput = {
  /** Source language code */
  sourceLanguageCode: Scalars['String']['input'];
  /** Phrase or sentence text */
  text: Scalars['String']['input'];
};

export type GrammarConceptOutModel = {
  __typename?: 'GrammarConceptOutModel';
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lemma: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  sourceLanguage: Scalars['String']['output'];
  targetLanguage: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GrammarExtractionOutModel = {
  __typename?: 'GrammarExtractionOutModel';
  grammarConcepts: Array<GrammarConceptOutModel>;
  grammarExtractionStatus: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  missingGrammarConcepts: Array<MissingGrammarConceptOutModel>;
  sentenceText: Scalars['String']['output'];
  sourceLanguage: Scalars['String']['output'];
};

export type LanguageOutModel = {
  __typename?: 'LanguageOutModel';
  code: Scalars['String']['output'];
  nameEng: Scalars['String']['output'];
  nameRus: Scalars['String']['output'];
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

export type MissingGrammarConceptOutModel = {
  __typename?: 'MissingGrammarConceptOutModel';
  category: Scalars['String']['output'];
  lemma: Scalars['String']['output'];
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
   * 	**[object Object]** — the user is already registered, but doesn't confirm his email.
   * 	**[object Object]** — the user is already registered and confirmed his email.
   */
  auth_register: UserOutModel;
  /** Resend email confirmation letter */
  auth_resendConfirmationEmail: Scalars['Boolean']['output'];
  /** Create book chapter */
  book_chapter_create: BookChapterOutModel;
  /** Delete book chapter */
  book_chapter_delete: Scalars['Boolean']['output'];
  /** Update book chapter */
  book_chapter_update: BookChapterOutModel;
  /** Create book */
  book_create: BookPrivateOutModel;
  /** Delete user book */
  book_delete: Scalars['Boolean']['output'];
  /** Update user book */
  book_update: BookPrivateOutModel;
  /** Generate audio pronunciation for a word using Google TTS and store it on S3 */
  create_audio_pronunciation: UniversalAudioPronunciationOutModel;
  /** Create transcription for a word using DeepSeek */
  create_transcription: TranscriptionOutModel;
  /** Добавить фразу из разбора предложения в коллекцию карточек пользователя. */
  flashcard_add: FlashcardOutModel;
  /** Удалить карточку пользователя. */
  flashcard_remove: Scalars['Boolean']['output'];
  /** Extract grammar concepts from a sentence using AI and link to available articles */
  grammar_concept_fetch: GrammarExtractionOutModel;
  /** Top up balance with YooKassa */
  payment_yookassa_top_up_balance: CreateYooKassaPaymentOutModel;
  /** Создать новый пустой тред чата с ИИ для выделенного предложения. Вызывается клиентом перед отправкой первого вопроса, если getSentenceChatThread вернул null. Если тред уже существует — отдаёт ошибку. */
  sentence_chat_create_thread: SentenceChatThreadOutModel;
  /** Добавить пользовательское сообщение (вопрос) в существующий тред. После этого клиент подключается к SSE-стриму /sentence-chat/threads/:threadId/assistant-stream, чтобы сервер сгенерировал и постримил ответ ассистента. */
  sentence_chat_create_user_message: SentenceChatMessageOutModel;
  /** Translate phrase in sentence by selected offsets */
  translate_translate_phrase: SentencePhraseTranslationOutModel;
  /** Translate sentence */
  translate_translate_sentence: TranslateSentenceResultOutModel;
  /** Create a new phrase */
  universal_phrase_create: UniversalPhraseOutModel;
  /** Create a video */
  video_private_create: CreateVideoPrivateOutModel;
  /** Delete a video */
  video_private_delete: Scalars['Boolean']['output'];
  /** Enqueue automatic subtitles generation (ASR) for a private uploaded video. Requires min balance. */
  video_private_generate_subtitles: VideoPrivateSubtitlesStatusOutModel;
  /** Update a video */
  video_private_update: UpdateVideoPrivateOutModel;
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


export type MutationBook_Chapter_CreateArgs = {
  input: CreateBookChapterInput;
};


export type MutationBook_Chapter_DeleteArgs = {
  input: DeleteBookChapterInput;
};


export type MutationBook_Chapter_UpdateArgs = {
  input: UpdateBookChapterInput;
};


export type MutationBook_CreateArgs = {
  input: CreatePrivateBookInput;
};


export type MutationBook_DeleteArgs = {
  input: DeletePrivateBookInput;
};


export type MutationBook_UpdateArgs = {
  input: UpdatePrivateBookInput;
};


export type MutationCreate_Audio_PronunciationArgs = {
  input: CreateUniversalAudioPronunciationInput;
};


export type MutationCreate_TranscriptionArgs = {
  input: CreateUniversalTranscriptionInput;
};


export type MutationFlashcard_AddArgs = {
  input: AddFlashcardInput;
};


export type MutationFlashcard_RemoveArgs = {
  input: RemoveFlashcardInput;
};


export type MutationGrammar_Concept_FetchArgs = {
  input: FetchGrammarConceptsInput;
};


export type MutationPayment_Yookassa_Top_Up_BalanceArgs = {
  input: TopUpBalanceWithYooKassaInput;
};


export type MutationSentence_Chat_Create_ThreadArgs = {
  input: CreateSentenceChatThreadInput;
};


export type MutationSentence_Chat_Create_User_MessageArgs = {
  input: CreateSentenceChatUserMessageInput;
};


export type MutationTranslate_Translate_PhraseArgs = {
  input: TranslatePhraseInput;
};


export type MutationTranslate_Translate_SentenceArgs = {
  input: TranslateSentenceInput;
};


export type MutationUniversal_Phrase_CreateArgs = {
  input: CreateUniversalPhraseInput;
};


export type MutationVideo_Private_CreateArgs = {
  input: CreatePrivateVideoInput;
};


export type MutationVideo_Private_DeleteArgs = {
  input: DeletePrivateVideoInput;
};


export type MutationVideo_Private_Generate_SubtitlesArgs = {
  input: GenerateSubtitlesForPrivateVideoInput;
};


export type MutationVideo_Private_UpdateArgs = {
  input: UpdatePrivateVideoInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get current user data */
  auth_getMe: UserOutModel;
  /** Get book chapter */
  book_chapter_get: BookChapterOutModel;
  /** Get user book */
  book_get: BookPrivateOutModel;
  /** Get public book */
  book_public_get_book: BookPublicOutModel;
  /** Get public books */
  book_public_get_books: Array<BookPublicOutModel>;
  /** Get user books */
  book_user_books: Array<BookPrivateOutModel>;
  /** Получить список карточек пользователя. Опционально фильтрует по языку. */
  flashcard_get_my: Array<FlashcardOutModel>;
  /** Get all available languages */
  language_get_languages: Array<LanguageOutModel>;
  /** Получить тред чата с ИИ для выделенного предложения со всеми сообщениями. Если тред ещё не создавался — возвращает null. */
  sentence_chat_get_thread?: Maybe<SentenceChatThreadOutModel>;
  /** Get existing phrase translation by sentence and offsets */
  translate_get_phrase_translation?: Maybe<SentencePhraseTranslationOutModel>;
  /** Get all existing phrase translations by sentence id */
  translate_get_phrase_translations_by_sentence: Array<SentencePhraseTranslationOutModel>;
  /** Get existing sentence translation by sentence id */
  translate_get_sentence_translation?: Maybe<TranslateSentenceResultOutModel>;
  /** Get phrase with transcription and audio pronunciations */
  universal_phrase_get: UniversalPhraseOutModel;
  /** Get a video */
  video_private_get: VideoPrivateOutModel;
  /** Poll current status of automatic subtitles generation for a private video. */
  video_private_get_subtitles_generation_status: VideoPrivateSubtitlesStatusOutModel;
  /** Get user videos */
  video_private_user_videos: Array<VideoPrivateLiteOutModel>;
  /** Get public video */
  video_public_get: VideoPublicOutModel;
  /** Get public videos */
  video_public_get_videos: Array<VideoPublicLiteOutModel>;
};


export type QueryBook_Chapter_GetArgs = {
  input: GetBookChapterInput;
};


export type QueryBook_GetArgs = {
  input: GetPrivateBookInput;
};


export type QueryBook_Public_Get_BookArgs = {
  input: GetBookPublicInput;
};


export type QueryFlashcard_Get_MyArgs = {
  input: GetMyFlashcardsInput;
};


export type QuerySentence_Chat_Get_ThreadArgs = {
  input: GetSentenceChatThreadInput;
};


export type QueryTranslate_Get_Phrase_TranslationArgs = {
  input: GetPhraseTranslationInput;
};


export type QueryTranslate_Get_Phrase_Translations_By_SentenceArgs = {
  input: GetPhraseTranslationsBySentenceInput;
};


export type QueryTranslate_Get_Sentence_TranslationArgs = {
  input: GetSentenceTranslationInput;
};


export type QueryUniversal_Phrase_GetArgs = {
  input: GetUniversalPhraseInput;
};


export type QueryVideo_Private_GetArgs = {
  input: GetPrivateVideoInput;
};


export type QueryVideo_Private_Get_Subtitles_Generation_StatusArgs = {
  input: VideoPrivateSubtitlesStatusInput;
};


export type QueryVideo_Public_GetArgs = {
  input: GetPublicVideoInput;
};

export type RegisterUserInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

export type RemoveFlashcardInput = {
  /** Flashcard id */
  flashcardId: Scalars['Int']['input'];
};

export type ResendConfirmationEmailInput = {
  /** User email */
  email: Scalars['String']['input'];
};

export type SentenceChatMessageOutModel = {
  __typename?: 'SentenceChatMessageOutModel';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  threadId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SentenceChatThreadOutModel = {
  __typename?: 'SentenceChatThreadOutModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  messages: Array<SentenceChatMessageOutModel>;
  sentenceId: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type SentenceOutModel = {
  __typename?: 'SentenceOutModel';
  grammarConcepts?: Maybe<Array<GrammarConceptOutModel>>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  missingGrammarConcepts?: Maybe<Array<MissingGrammarConceptOutModel>>;
  sentencePhraseTranslations?: Maybe<Array<SentencePhraseTranslationOutModel>>;
  sentenceTranslation?: Maybe<SentenceTranslationOutModel>;
  startOffset: Scalars['Int']['output'];
};

export type SentencePhraseTranslationExampleOutModel = {
  __typename?: 'SentencePhraseTranslationExampleOutModel';
  text: Scalars['String']['output'];
  translate: Scalars['String']['output'];
};

export type SentencePhraseTranslationOutModel = {
  __typename?: 'SentencePhraseTranslationOutModel';
  createdAt: Scalars['String']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  examples: Array<SentencePhraseTranslationExampleOutModel>;
  flashcardId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  phrase: Scalars['String']['output'];
  phraseEndOffset: Scalars['Int']['output'];
  phraseStartOffset: Scalars['Int']['output'];
  sentenceId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  translate?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type SentenceTranslationLiteOutModel = {
  __typename?: 'SentenceTranslationLiteOutModel';
  id: Scalars['Int']['output'];
  translation: Scalars['String']['output'];
};

export type SentenceTranslationOutModel = {
  __typename?: 'SentenceTranslationOutModel';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  sentenceId: Scalars['Int']['output'];
  translation: Scalars['String']['output'];
};

export type SubtitleSentenceInitOutModel = {
  __typename?: 'SubtitleSentenceInitOutModel';
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  sentenceId: Scalars['Int']['output'];
  startOffset: Scalars['Int']['output'];
  subtitleId: Scalars['Int']['output'];
};

/** Lifecycle status of automatic subtitles generation for a private video */
export enum SubtitlesGenerationStatus {
  Done = 'done',
  Failed = 'failed',
  Idle = 'idle',
  Pending = 'pending',
  Processing = 'processing'
}

export type TopUpBalanceWithYooKassaInput = {
  /** Amount in kopecks */
  amountInKopecks: Scalars['Int']['input'];
};

export type TranscriptionOutModel = {
  __typename?: 'TranscriptionOutModel';
  id: Scalars['Int']['output'];
  ipa?: Maybe<Scalars['String']['output']>;
  pinyin?: Maybe<Scalars['String']['output']>;
  universalPhraseId: Scalars['Int']['output'];
};

export type TranslatePhraseInput = {
  bookAuthor?: InputMaybe<Scalars['String']['input']>;
  bookName?: InputMaybe<Scalars['String']['input']>;
  /** Selected word text */
  selectedWord: Scalars['String']['input'];
  /** Selected word end offset in sentence (end-exclusive) */
  selectedWordEndOffset: Scalars['Float']['input'];
  /** Selected word start offset in sentence */
  selectedWordStartOffset: Scalars['Float']['input'];
  /** Sentence id */
  sentenceId: Scalars['Float']['input'];
  /** Source language code */
  sourceLanguageCode?: InputMaybe<Scalars['String']['input']>;
  /** Target language code */
  targetLanguageCode: Scalars['String']['input'];
  /** Full sentence text */
  text: Scalars['String']['input'];
  videoName?: InputMaybe<Scalars['String']['input']>;
  videoYear?: InputMaybe<Scalars['String']['input']>;
};

export type TranslateSentenceInput = {
  /** Book author */
  bookAuthor?: InputMaybe<Scalars['String']['input']>;
  /** Book name */
  bookName?: InputMaybe<Scalars['String']['input']>;
  /** Sentence id */
  sentenceId: Scalars['Float']['input'];
  /** Source language code */
  sourceLanguageCode?: InputMaybe<Scalars['String']['input']>;
  /** Target language code */
  targetLanguageCode: Scalars['String']['input'];
  /** Video name */
  videoName?: InputMaybe<Scalars['String']['input']>;
  /** Video release year */
  videoYear?: InputMaybe<Scalars['String']['input']>;
};

export type TranslateSentenceResultOutModel = {
  __typename?: 'TranslateSentenceResultOutModel';
  sentenceId: Scalars['Int']['output'];
  translation: Scalars['String']['output'];
};

export type UniversalAudioPronunciationOutModel = {
  __typename?: 'UniversalAudioPronunciationOutModel';
  audioUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  universalPhraseId: Scalars['Int']['output'];
};

export type UniversalPhraseOutModel = {
  __typename?: 'UniversalPhraseOutModel';
  audioPronunciation?: Maybe<UniversalAudioPronunciationOutModel>;
  id: Scalars['Int']['output'];
  sourceLanguageCode: Scalars['String']['output'];
  text: Scalars['String']['output'];
  transcription?: Maybe<TranscriptionOutModel>;
};

export type UpdateBookChapterInput = {
  /** BookChapter header */
  header?: InputMaybe<Scalars['String']['input']>;
  /** BookChapter id */
  id: Scalars['Int']['input'];
  /** BookChapter name (chapter 1) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** BookChapter note */
  note?: InputMaybe<Scalars['String']['input']>;
  /** BookChapter content */
  originalContent?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePrivateBookInput = {
  /** Author */
  author?: InputMaybe<Scalars['String']['input']>;
  /** File mime type */
  fileMimeType?: InputMaybe<Scalars['String']['input']>;
  /** File name */
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** Book id */
  id: Scalars['Int']['input'];
  /** Is file was upload to S3 */
  isFileUploaded?: InputMaybe<Scalars['Boolean']['input']>;
  /** Language code */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  /** Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Note */
  note?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePrivateVideoInput = {
  /** File duration in seconds */
  fileDurationSec?: InputMaybe<Scalars['Int']['input']>;
  /** File mime type */
  fileMimeType?: InputMaybe<Scalars['String']['input']>;
  /** File name */
  fileName?: InputMaybe<Scalars['String']['input']>;
  /** File size */
  fileSizeMb?: InputMaybe<Scalars['Float']['input']>;
  /** Video id */
  id: Scalars['Int']['input'];
  /** Is file was upload to S3 */
  isFileUploaded?: InputMaybe<Scalars['Boolean']['input']>;
  /** Language code */
  languageCode?: InputMaybe<Scalars['String']['input']>;
  /** Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Original content */
  originalContent?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVideoPrivateOutModel = {
  __typename?: 'UpdateVideoPrivateOutModel';
  contentType: Scalars['String']['output'];
  fileDurationSec?: Maybe<Scalars['Int']['output']>;
  fileSizeMb?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  processedContent?: Maybe<Scalars['String']['output']>;
  uploadUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type UserOutModel = {
  __typename?: 'UserOutModel';
  balance: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isUserConfirmed: Scalars['Boolean']['output'];
};

export type VideoPrivateLiteOutModel = {
  __typename?: 'VideoPrivateLiteOutModel';
  contentType: Scalars['String']['output'];
  fileDurationSec?: Maybe<Scalars['Int']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileS3Key?: Maybe<Scalars['String']['output']>;
  fileSizeMb: Scalars['Int']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isFileUploaded: Scalars['Boolean']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  processedContent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type VideoPrivateOutModel = {
  __typename?: 'VideoPrivateOutModel';
  contentType: Scalars['String']['output'];
  fileDurationSec?: Maybe<Scalars['Int']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileS3Key?: Maybe<Scalars['String']['output']>;
  fileSizeMb: Scalars['Int']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  freeToUse: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  isFileUploaded: Scalars['Boolean']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originalContent?: Maybe<Scalars['String']['output']>;
  processedContent?: Maybe<Scalars['String']['output']>;
  sentences?: Maybe<Array<VideoPrivateSentenceOutModel>>;
  subtitleSentenceInit?: Maybe<Array<SubtitleSentenceInitOutModel>>;
  subtitles?: Maybe<Array<VideoPrivateSubtitleOutModel>>;
  userId: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type VideoPrivateSentenceOutModel = {
  __typename?: 'VideoPrivateSentenceOutModel';
  grammarConcepts?: Maybe<Array<GrammarConceptOutModel>>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  missingGrammarConcepts?: Maybe<Array<MissingGrammarConceptOutModel>>;
  orderIndex: Scalars['Int']['output'];
  sentenceTranslations?: Maybe<Array<SentenceTranslationLiteOutModel>>;
  startOffset: Scalars['Int']['output'];
};

export type VideoPrivateSubtitleOutModel = {
  __typename?: 'VideoPrivateSubtitleOutModel';
  endTimeMs: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  orderIndex: Scalars['Int']['output'];
  startOffset: Scalars['Int']['output'];
  startTimeMs: Scalars['Int']['output'];
};

export type VideoPrivateSubtitlesStatusInput = {
  /** Id of the private video to poll subtitles generation status for */
  videoId: Scalars['Int']['input'];
};

export type VideoPrivateSubtitlesStatusOutModel = {
  __typename?: 'VideoPrivateSubtitlesStatusOutModel';
  error?: Maybe<Scalars['String']['output']>;
  jobId?: Maybe<Scalars['String']['output']>;
  /** ISO 8601 timestamp when current generation job started */
  startedAt?: Maybe<Scalars['String']['output']>;
  status: SubtitlesGenerationStatus;
  videoId: Scalars['Int']['output'];
};

export type VideoPublicLiteOutModel = {
  __typename?: 'VideoPublicLiteOutModel';
  contentType: Scalars['String']['output'];
  coverBackgroundColor: Scalars['String']['output'];
  covers: Array<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileS3Key: Scalars['String']['output'];
  fileUrl: Scalars['String']['output'];
  freeToUse: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note: Scalars['String']['output'];
  originalContent: Scalars['String']['output'];
  processedContent: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type VideoPublicOutModel = {
  __typename?: 'VideoPublicOutModel';
  contentType: Scalars['String']['output'];
  coverBackgroundColor: Scalars['String']['output'];
  covers: Array<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileS3Key: Scalars['String']['output'];
  fileUrl: Scalars['String']['output'];
  freeToUse: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  languageCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note: Scalars['String']['output'];
  originalContent: Scalars['String']['output'];
  processedContent: Scalars['String']['output'];
  sentences?: Maybe<Array<VideoPublicSentenceOutModel>>;
  subtitleSentenceInit?: Maybe<Array<SubtitleSentenceInitOutModel>>;
  subtitles?: Maybe<Array<VideoPublicSubtitleOutModel>>;
  year: Scalars['Int']['output'];
};

export type VideoPublicSentenceOutModel = {
  __typename?: 'VideoPublicSentenceOutModel';
  grammarConcepts?: Maybe<Array<GrammarConceptOutModel>>;
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  missingGrammarConcepts?: Maybe<Array<MissingGrammarConceptOutModel>>;
  orderIndex: Scalars['Int']['output'];
  sentenceTranslations?: Maybe<Array<SentenceTranslationLiteOutModel>>;
  startOffset: Scalars['Int']['output'];
};

export type VideoPublicSubtitleOutModel = {
  __typename?: 'VideoPublicSubtitleOutModel';
  endTimeMs: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  length: Scalars['Int']['output'];
  orderIndex: Scalars['Int']['output'];
  startOffset: Scalars['Int']['output'];
  startTimeMs: Scalars['Int']['output'];
};

export type AudioPronunciation_CreateVariables = Exact<{
  input: CreateUniversalAudioPronunciationInput;
}>;


export type AudioPronunciation_Create = { __typename?: 'Mutation', create_audio_pronunciation: { __typename?: 'UniversalAudioPronunciationOutModel', id: number, universalPhraseId: number, audioUrl: string } };

export type Auth_ConfirmEmailVariables = Exact<{
  input: ConfirmEmailInput;
}>;


export type Auth_ConfirmEmail = { __typename?: 'Mutation', auth_confirmEmail: boolean };

export type Auth_GetMeVariables = Exact<{ [key: string]: never; }>;


export type Auth_GetMe = { __typename?: 'Query', auth_getMe: { __typename?: 'UserOutModel', id: number, email: string, isUserConfirmed: boolean, balance: number } };

export type Auth_LoginVariables = Exact<{
  input: LoginInput;
}>;


export type Auth_Login = { __typename?: 'Mutation', auth_login: { __typename?: 'UserOutModel', id: number, email: string, isUserConfirmed: boolean, balance: number } };

export type Auth_Login_With_OAuthVariables = Exact<{
  input: LoginWithOAuthInput;
}>;


export type Auth_Login_With_OAuth = { __typename?: 'Mutation', auth_login_with_OAuth: { __typename?: 'UserOutModel', id: number, email: string, isUserConfirmed: boolean, balance: number } };

export type Auth_LogoutVariables = Exact<{ [key: string]: never; }>;


export type Auth_Logout = { __typename?: 'Mutation', auth_logout: boolean };

export type Auth_RegisterVariables = Exact<{
  input: RegisterUserInput;
}>;


export type Auth_Register = { __typename?: 'Mutation', auth_register: { __typename?: 'UserOutModel', id: number, email: string } };

export type BookChapter_CreateVariables = Exact<{
  input: CreateBookChapterInput;
}>;


export type BookChapter_Create = { __typename?: 'Mutation', book_chapter_create: { __typename?: 'BookChapterOutModel', id: number, name?: string | null, header?: string | null, originalContent?: string | null, processedContent?: string | null, note?: string | null, book: { __typename?: 'BookLiteOutModel', id: number, name?: string | null, languageCode: string, author?: string | null, note?: string | null, userId?: number | null } } };

export type BookChapter_DeleteVariables = Exact<{
  input: DeleteBookChapterInput;
}>;


export type BookChapter_Delete = { __typename?: 'Mutation', book_chapter_delete: boolean };

export type BookChapter_GetVariables = Exact<{
  input: GetBookChapterInput;
}>;


export type BookChapter_Get = { __typename?: 'Query', book_chapter_get: { __typename?: 'BookChapterOutModel', id: number, name?: string | null, header?: string | null, note?: string | null, originalContent?: string | null, processedContent?: string | null, sentences?: Array<{ __typename?: 'SentenceOutModel', id: number, startOffset: number, length: number, grammarConcepts?: Array<{ __typename?: 'GrammarConceptOutModel', id: string, title: string, slug: string, category: string, lemma: string, order: number, sourceLanguage: string, targetLanguage: string }> | null, missingGrammarConcepts?: Array<{ __typename?: 'MissingGrammarConceptOutModel', category: string, lemma: string }> | null, sentenceTranslation?: { __typename?: 'SentenceTranslationOutModel', id: number, sentenceId: number, translation: string, createdAt: string } | null, sentencePhraseTranslations?: Array<{ __typename?: 'SentencePhraseTranslationOutModel', id: number, sentenceId: number, phrase: string, phraseStartOffset: number, phraseEndOffset: number, translate?: string | null, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string, flashcardId?: number | null, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> }> | null }> | null, book: { __typename?: 'BookLiteOutModel', id: number, name?: string | null, languageCode: string, author?: string | null, note?: string | null, userId?: number | null } } };

export type BookChapter_UpdateVariables = Exact<{
  input: UpdateBookChapterInput;
}>;


export type BookChapter_Update = { __typename?: 'Mutation', book_chapter_update: { __typename?: 'BookChapterOutModel', id: number, name?: string | null, header?: string | null, originalContent?: string | null, processedContent?: string | null, note?: string | null, book: { __typename?: 'BookLiteOutModel', id: number, name?: string | null, languageCode: string, author?: string | null, note?: string | null, userId?: number | null } } };

export type Book_CreateVariables = Exact<{
  input: CreatePrivateBookInput;
}>;


export type Book_Create = { __typename?: 'Mutation', book_create: { __typename?: 'BookPrivateOutModel', id: number, author?: string | null, name?: string | null, languageCode?: string | null, note?: string | null, userId: number, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> } };

export type Book_DeleteVariables = Exact<{
  input: DeletePrivateBookInput;
}>;


export type Book_Delete = { __typename?: 'Mutation', book_delete: boolean };

export type Book_GetVariables = Exact<{
  input: GetPrivateBookInput;
}>;


export type Book_Get = { __typename?: 'Query', book_get: { __typename?: 'BookPrivateOutModel', id: number, author?: string | null, name?: string | null, languageCode?: string | null, note?: string | null, userId: number, freeToUse: boolean, coverUrl?: string | null, fileName?: string | null, isFileUploaded: boolean, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> } };

export type Book_GetUserBooksVariables = Exact<{ [key: string]: never; }>;


export type Book_GetUserBooks = { __typename?: 'Query', book_user_books: Array<{ __typename?: 'BookPrivateOutModel', id: number, author?: string | null, name?: string | null, languageCode?: string | null, note?: string | null, userId: number, freeToUse: boolean, coverUrl?: string | null, fileName?: string | null, isFileUploaded: boolean, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> }> };

export type Book_UpdateVariables = Exact<{
  input: UpdatePrivateBookInput;
}>;


export type Book_Update = { __typename?: 'Mutation', book_update: { __typename?: 'BookPrivateOutModel', id: number, author?: string | null, name?: string | null, languageCode?: string | null, note?: string | null, userId: number, coverUrl?: string | null, uploadUrl?: string | null, fileName?: string | null, fileS3Key?: string | null, isFileUploaded: boolean, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> } };

export type Book_GetBookPublicVariables = Exact<{
  input: GetBookPublicInput;
}>;


export type Book_GetBookPublic = { __typename?: 'Query', book_public_get_book: { __typename?: 'BookPublicOutModel', id: number, author?: string | null, name: string, languageCode: string, note: string, covers: Array<string>, coverBackgroundColor: string, freeToUse: boolean, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> } };

export type Book_GetBooksPublicVariables = Exact<{ [key: string]: never; }>;


export type Book_GetBooksPublic = { __typename?: 'Query', book_public_get_books: Array<{ __typename?: 'BookPublicOutModel', id: number, author?: string | null, name: string, languageCode: string, note: string, covers: Array<string>, coverBackgroundColor: string, freeToUse: boolean, chapters: Array<{ __typename?: 'BookChapterLiteOutModel', id: number, bookId: number, name?: string | null, header?: string | null, note?: string | null }> }> };

export type Flashcard_AddVariables = Exact<{
  input: AddFlashcardInput;
}>;


export type Flashcard_Add = { __typename?: 'Mutation', flashcard_add: { __typename?: 'FlashcardOutModel', id: number, languageCode: string, sentenceText: string, sentenceTranslation?: string | null, phrase: string, phraseStartOffset: number, phraseEndOffset: number, phraseTranslation?: string | null, phraseTranscription?: string | null, bookPrivateId?: number | null, bookPublicId?: number | null, videoPrivateId?: number | null, videoPublicId?: number | null, sentencePhraseTranslationId?: number | null, createdAt: string, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> } };

export type Flashcard_Get_MyVariables = Exact<{
  input: GetMyFlashcardsInput;
}>;


export type Flashcard_Get_My = { __typename?: 'Query', flashcard_get_my: Array<{ __typename?: 'FlashcardOutModel', id: number, languageCode: string, sentenceText: string, sentenceTranslation?: string | null, phrase: string, phraseStartOffset: number, phraseEndOffset: number, phraseTranslation?: string | null, phraseTranscription?: string | null, bookPrivateId?: number | null, bookPublicId?: number | null, videoPrivateId?: number | null, videoPublicId?: number | null, sentencePhraseTranslationId?: number | null, createdAt: string, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> }> };

export type Flashcard_RemoveVariables = Exact<{
  input: RemoveFlashcardInput;
}>;


export type Flashcard_Remove = { __typename?: 'Mutation', flashcard_remove: boolean };

export type GrammarConcept_FetchVariables = Exact<{
  input: FetchGrammarConceptsInput;
}>;


export type GrammarConcept_Fetch = { __typename?: 'Mutation', grammar_concept_fetch: { __typename?: 'GrammarExtractionOutModel', id: number, sentenceText: string, sourceLanguage: string, grammarExtractionStatus: string, grammarConcepts: Array<{ __typename?: 'GrammarConceptOutModel', id: string, title: string, slug: string, category: string, lemma: string, order: number, sourceLanguage: string, targetLanguage: string }>, missingGrammarConcepts: Array<{ __typename?: 'MissingGrammarConceptOutModel', category: string, lemma: string }> } };

export type Language_Get_LanguagesVariables = Exact<{ [key: string]: never; }>;


export type Language_Get_Languages = { __typename?: 'Query', language_get_languages: Array<{ __typename?: 'LanguageOutModel', code: string, nameRus: string, nameEng: string }> };

export type Payment_YookassaTopUpBalanceVariables = Exact<{
  input: TopUpBalanceWithYooKassaInput;
}>;


export type Payment_YookassaTopUpBalance = { __typename?: 'Mutation', payment_yookassa_top_up_balance: { __typename?: 'CreateYooKassaPaymentOutModel', confirmationUrl: string } };

export type Sentence_Chat_Create_ThreadVariables = Exact<{
  input: CreateSentenceChatThreadInput;
}>;


export type Sentence_Chat_Create_Thread = { __typename?: 'Mutation', sentence_chat_create_thread: { __typename?: 'SentenceChatThreadOutModel', id: number, sentenceId: number, createdAt: string, updatedAt: string, messages: Array<{ __typename?: 'SentenceChatMessageOutModel', id: number, threadId: number, role: string, content: string, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string }> } };

export type Sentence_Chat_Create_User_MessageVariables = Exact<{
  input: CreateSentenceChatUserMessageInput;
}>;


export type Sentence_Chat_Create_User_Message = { __typename?: 'Mutation', sentence_chat_create_user_message: { __typename?: 'SentenceChatMessageOutModel', id: number, threadId: number, role: string, content: string, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string } };

export type Sentence_Chat_Get_ThreadVariables = Exact<{
  input: GetSentenceChatThreadInput;
}>;


export type Sentence_Chat_Get_Thread = { __typename?: 'Query', sentence_chat_get_thread?: { __typename?: 'SentenceChatThreadOutModel', id: number, sentenceId: number, createdAt: string, updatedAt: string, messages: Array<{ __typename?: 'SentenceChatMessageOutModel', id: number, threadId: number, role: string, content: string, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string }> } | null };

export type Transcription_CreateVariables = Exact<{
  input: CreateUniversalTranscriptionInput;
}>;


export type Transcription_Create = { __typename?: 'Mutation', create_transcription: { __typename?: 'TranscriptionOutModel', id: number, universalPhraseId: number, ipa?: string | null, pinyin?: string | null } };

export type Translate_Get_Phrase_TranslationVariables = Exact<{
  input: GetPhraseTranslationInput;
}>;


export type Translate_Get_Phrase_Translation = { __typename?: 'Query', translate_get_phrase_translation?: { __typename?: 'SentencePhraseTranslationOutModel', id: number, sentenceId: number, phrase: string, phraseStartOffset: number, phraseEndOffset: number, translate?: string | null, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string, flashcardId?: number | null, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> } | null };

export type Translate_Get_Phrase_Translations_By_SentenceVariables = Exact<{
  input: GetPhraseTranslationsBySentenceInput;
}>;


export type Translate_Get_Phrase_Translations_By_Sentence = { __typename?: 'Query', translate_get_phrase_translations_by_sentence: Array<{ __typename?: 'SentencePhraseTranslationOutModel', id: number, sentenceId: number, phrase: string, phraseStartOffset: number, phraseEndOffset: number, translate?: string | null, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string, flashcardId?: number | null, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> }> };

export type Translate_Get_Sentence_TranslationVariables = Exact<{
  input: GetSentenceTranslationInput;
}>;


export type Translate_Get_Sentence_Translation = { __typename?: 'Query', translate_get_sentence_translation?: { __typename?: 'TranslateSentenceResultOutModel', sentenceId: number, translation: string } | null };

export type Translate_Translate_PhraseVariables = Exact<{
  input: TranslatePhraseInput;
}>;


export type Translate_Translate_Phrase = { __typename?: 'Mutation', translate_translate_phrase: { __typename?: 'SentencePhraseTranslationOutModel', id: number, sentenceId: number, phrase: string, phraseStartOffset: number, phraseEndOffset: number, translate?: string | null, status: string, errorMessage?: string | null, createdAt: string, updatedAt: string, flashcardId?: number | null, examples: Array<{ __typename?: 'SentencePhraseTranslationExampleOutModel', text: string, translate: string }> } };

export type Translate_Translate_SentenceVariables = Exact<{
  input: TranslateSentenceInput;
}>;


export type Translate_Translate_Sentence = { __typename?: 'Mutation', translate_translate_sentence: { __typename?: 'TranslateSentenceResultOutModel', sentenceId: number, translation: string } };

export type UniversalPhrase_CreateVariables = Exact<{
  input: CreateUniversalPhraseInput;
}>;


export type UniversalPhrase_Create = { __typename?: 'Mutation', universal_phrase_create: { __typename?: 'UniversalPhraseOutModel', id: number, text: string, sourceLanguageCode: string, transcription?: { __typename?: 'TranscriptionOutModel', id: number, universalPhraseId: number, ipa?: string | null, pinyin?: string | null } | null, audioPronunciation?: { __typename?: 'UniversalAudioPronunciationOutModel', id: number, universalPhraseId: number, audioUrl: string } | null } };

export type UniversalPhrase_GetVariables = Exact<{
  input: GetUniversalPhraseInput;
}>;


export type UniversalPhrase_Get = { __typename?: 'Query', universal_phrase_get: { __typename?: 'UniversalPhraseOutModel', id: number, text: string, sourceLanguageCode: string, transcription?: { __typename?: 'TranscriptionOutModel', id: number, universalPhraseId: number, ipa?: string | null, pinyin?: string | null } | null, audioPronunciation?: { __typename?: 'UniversalAudioPronunciationOutModel', id: number, universalPhraseId: number, audioUrl: string } | null } };

export type VideoPrivate_CreateVariables = Exact<{
  input: CreatePrivateVideoInput;
}>;


export type VideoPrivate_Create = { __typename?: 'Mutation', video_private_create: { __typename?: 'CreateVideoPrivateOutModel', id: number, name?: string | null, year?: number | null, languageCode: string, contentType: string, originalContent?: string | null, processedContent?: string | null, userId: number } };

export type VideoPrivate_DeleteVariables = Exact<{
  input: DeletePrivateVideoInput;
}>;


export type VideoPrivate_Delete = { __typename?: 'Mutation', video_private_delete: boolean };

export type VideoPrivate_GenerateSubtitlesVariables = Exact<{
  input: GenerateSubtitlesForPrivateVideoInput;
}>;


export type VideoPrivate_GenerateSubtitles = { __typename?: 'Mutation', video_private_generate_subtitles: { __typename?: 'VideoPrivateSubtitlesStatusOutModel', videoId: number, status: SubtitlesGenerationStatus, error?: string | null, startedAt?: string | null, jobId?: string | null } };

export type VideoPrivate_GetVariables = Exact<{
  input: GetPrivateVideoInput;
}>;


export type VideoPrivate_Get = { __typename?: 'Query', video_private_get: { __typename?: 'VideoPrivateOutModel', id: number, name?: string | null, year?: number | null, languageCode?: string | null, originalContent?: string | null, processedContent?: string | null, contentType: string, userId: number, fileName?: string | null, fileS3Key?: string | null, fileUrl?: string | null, isFileUploaded: boolean, fileSizeMb: number, freeToUse: boolean, sentences?: Array<{ __typename?: 'VideoPrivateSentenceOutModel', id: number, startOffset: number, length: number, orderIndex: number, sentenceTranslations?: Array<{ __typename?: 'SentenceTranslationLiteOutModel', id: number, translation: string }> | null, grammarConcepts?: Array<{ __typename?: 'GrammarConceptOutModel', id: string, title: string, slug: string, category: string, lemma: string, order: number, sourceLanguage: string, targetLanguage: string }> | null, missingGrammarConcepts?: Array<{ __typename?: 'MissingGrammarConceptOutModel', category: string, lemma: string }> | null }> | null, subtitles?: Array<{ __typename?: 'VideoPrivateSubtitleOutModel', id: number, startTimeMs: number, endTimeMs: number, startOffset: number, length: number, orderIndex: number }> | null, subtitleSentenceInit?: Array<{ __typename?: 'SubtitleSentenceInitOutModel', id: number, subtitleId: number, sentenceId: number, startOffset: number, length: number }> | null } };

export type VideoPrivate_GetSubtitlesGenerationStatusVariables = Exact<{
  input: VideoPrivateSubtitlesStatusInput;
}>;


export type VideoPrivate_GetSubtitlesGenerationStatus = { __typename?: 'Query', video_private_get_subtitles_generation_status: { __typename?: 'VideoPrivateSubtitlesStatusOutModel', videoId: number, status: SubtitlesGenerationStatus, error?: string | null, startedAt?: string | null, jobId?: string | null } };

export type VideoPrivate_GetUserVideosVariables = Exact<{ [key: string]: never; }>;


export type VideoPrivate_GetUserVideos = { __typename?: 'Query', video_private_user_videos: Array<{ __typename?: 'VideoPrivateLiteOutModel', id: number, name?: string | null, year?: number | null, languageCode?: string | null, contentType: string, originalContent?: string | null, userId: number, fileName?: string | null, fileS3Key?: string | null, fileUrl?: string | null, isFileUploaded: boolean, fileSizeMb: number }> };

export type VideoPrivate_UpdateVariables = Exact<{
  input: UpdatePrivateVideoInput;
}>;


export type VideoPrivate_Update = { __typename?: 'Mutation', video_private_update: { __typename?: 'UpdateVideoPrivateOutModel', id: number, name?: string | null, year?: number | null, languageCode?: string | null, contentType: string, originalContent?: string | null, processedContent?: string | null, userId: number, uploadUrl?: string | null, fileSizeMb?: number | null } };

export type VideoPublic_GetVariables = Exact<{
  input: GetPublicVideoInput;
}>;


export type VideoPublic_Get = { __typename?: 'Query', video_public_get: { __typename?: 'VideoPublicOutModel', id: number, name: string, year: number, languageCode: string, note: string, covers: Array<string>, coverBackgroundColor: string, originalContent: string, processedContent: string, contentType: string, fileName: string, fileS3Key: string, fileUrl: string, freeToUse: boolean, sentences?: Array<{ __typename?: 'VideoPublicSentenceOutModel', id: number, startOffset: number, length: number, orderIndex: number, sentenceTranslations?: Array<{ __typename?: 'SentenceTranslationLiteOutModel', id: number, translation: string }> | null, grammarConcepts?: Array<{ __typename?: 'GrammarConceptOutModel', id: string, title: string, slug: string, category: string, lemma: string, order: number, sourceLanguage: string, targetLanguage: string }> | null, missingGrammarConcepts?: Array<{ __typename?: 'MissingGrammarConceptOutModel', category: string, lemma: string }> | null }> | null, subtitles?: Array<{ __typename?: 'VideoPublicSubtitleOutModel', id: number, startTimeMs: number, endTimeMs: number, startOffset: number, length: number, orderIndex: number }> | null, subtitleSentenceInit?: Array<{ __typename?: 'SubtitleSentenceInitOutModel', id: number, subtitleId: number, sentenceId: number, startOffset: number, length: number }> | null } };

export type VideoPublic_GetVideosVariables = Exact<{ [key: string]: never; }>;


export type VideoPublic_GetVideos = { __typename?: 'Query', video_public_get_videos: Array<{ __typename?: 'VideoPublicLiteOutModel', id: number, name: string, year: number, languageCode: string, note: string, covers: Array<string>, coverBackgroundColor: string, originalContent: string, processedContent: string, contentType: string, fileName: string, fileS3Key: string, fileUrl: string, freeToUse: boolean }> };


export const AudioPronunciation_CreateDocument = gql`
    mutation AudioPronunciation_create($input: CreateUniversalAudioPronunciationInput!) {
  create_audio_pronunciation(input: $input) {
    id
    universalPhraseId
    audioUrl
  }
}
    `;
export type AudioPronunciation_CreateMutationFn = Apollo.MutationFunction<AudioPronunciation_Create, AudioPronunciation_CreateVariables>;

/**
 * __useAudioPronunciation_Create__
 *
 * To run a mutation, you first call `useAudioPronunciation_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAudioPronunciation_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [audioPronunciationCreate, { data, loading, error }] = useAudioPronunciation_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAudioPronunciation_Create(baseOptions?: Apollo.MutationHookOptions<AudioPronunciation_Create, AudioPronunciation_CreateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AudioPronunciation_Create, AudioPronunciation_CreateVariables>(AudioPronunciation_CreateDocument, options);
      }
export type AudioPronunciation_CreateHookResult = ReturnType<typeof useAudioPronunciation_Create>;
export type AudioPronunciation_CreateMutationResult = Apollo.MutationResult<AudioPronunciation_Create>;
export type AudioPronunciation_CreateMutationOptions = Apollo.BaseMutationOptions<AudioPronunciation_Create, AudioPronunciation_CreateVariables>;
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
    isUserConfirmed
    balance
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
// @ts-ignore
export function useAuth_GetMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>): Apollo.UseSuspenseQueryResult<Auth_GetMe, Auth_GetMeVariables>;
export function useAuth_GetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Auth_GetMe, Auth_GetMeVariables>): Apollo.UseSuspenseQueryResult<Auth_GetMe | undefined, Auth_GetMeVariables>;
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
    isUserConfirmed
    balance
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
    isUserConfirmed
    balance
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
export const BookChapter_CreateDocument = gql`
    mutation BookChapter_create($input: CreateBookChapterInput!) {
  book_chapter_create(input: $input) {
    id
    name
    header
    originalContent
    processedContent
    note
    book {
      id
      name
      languageCode
      author
      note
      userId
    }
  }
}
    `;
export type BookChapter_CreateMutationFn = Apollo.MutationFunction<BookChapter_Create, BookChapter_CreateVariables>;

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
export function useBookChapter_Create(baseOptions?: Apollo.MutationHookOptions<BookChapter_Create, BookChapter_CreateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookChapter_Create, BookChapter_CreateVariables>(BookChapter_CreateDocument, options);
      }
export type BookChapter_CreateHookResult = ReturnType<typeof useBookChapter_Create>;
export type BookChapter_CreateMutationResult = Apollo.MutationResult<BookChapter_Create>;
export type BookChapter_CreateMutationOptions = Apollo.BaseMutationOptions<BookChapter_Create, BookChapter_CreateVariables>;
export const BookChapter_DeleteDocument = gql`
    mutation BookChapter_delete($input: DeleteBookChapterInput!) {
  book_chapter_delete(input: $input)
}
    `;
export type BookChapter_DeleteMutationFn = Apollo.MutationFunction<BookChapter_Delete, BookChapter_DeleteVariables>;

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
export function useBookChapter_Delete(baseOptions?: Apollo.MutationHookOptions<BookChapter_Delete, BookChapter_DeleteVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookChapter_Delete, BookChapter_DeleteVariables>(BookChapter_DeleteDocument, options);
      }
export type BookChapter_DeleteHookResult = ReturnType<typeof useBookChapter_Delete>;
export type BookChapter_DeleteMutationResult = Apollo.MutationResult<BookChapter_Delete>;
export type BookChapter_DeleteMutationOptions = Apollo.BaseMutationOptions<BookChapter_Delete, BookChapter_DeleteVariables>;
export const BookChapter_GetDocument = gql`
    query BookChapter_get($input: GetBookChapterInput!) {
  book_chapter_get(input: $input) {
    id
    name
    header
    note
    originalContent
    processedContent
    sentences {
      id
      startOffset
      length
      grammarConcepts {
        id
        title
        slug
        category
        lemma
        order
        sourceLanguage
        targetLanguage
      }
      missingGrammarConcepts {
        category
        lemma
      }
      sentenceTranslation {
        id
        sentenceId
        translation
        createdAt
      }
      sentencePhraseTranslations {
        id
        sentenceId
        phrase
        phraseStartOffset
        phraseEndOffset
        translate
        examples {
          text
          translate
        }
        status
        errorMessage
        createdAt
        updatedAt
        flashcardId
      }
    }
    book {
      id
      name
      languageCode
      author
      note
      userId
    }
  }
}
    `;

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
export function useBookChapter_Get(baseOptions: Apollo.QueryHookOptions<BookChapter_Get, BookChapter_GetVariables> & ({ variables: BookChapter_GetVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options);
      }
export function useBookChapter_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options);
        }
// @ts-ignore
export function useBookChapter_GetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>): Apollo.UseSuspenseQueryResult<BookChapter_Get, BookChapter_GetVariables>;
export function useBookChapter_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>): Apollo.UseSuspenseQueryResult<BookChapter_Get | undefined, BookChapter_GetVariables>;
export function useBookChapter_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookChapter_Get, BookChapter_GetVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookChapter_Get, BookChapter_GetVariables>(BookChapter_GetDocument, options);
        }
export type BookChapter_GetHookResult = ReturnType<typeof useBookChapter_Get>;
export type BookChapter_GetLazyQueryHookResult = ReturnType<typeof useBookChapter_GetLazyQuery>;
export type BookChapter_GetSuspenseQueryHookResult = ReturnType<typeof useBookChapter_GetSuspenseQuery>;
export type BookChapter_GetQueryResult = Apollo.QueryResult<BookChapter_Get, BookChapter_GetVariables>;
export const BookChapter_UpdateDocument = gql`
    mutation BookChapter_update($input: UpdateBookChapterInput!) {
  book_chapter_update(input: $input) {
    id
    name
    header
    originalContent
    processedContent
    note
    book {
      id
      name
      languageCode
      author
      note
      userId
    }
  }
}
    `;
export type BookChapter_UpdateMutationFn = Apollo.MutationFunction<BookChapter_Update, BookChapter_UpdateVariables>;

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
export function useBookChapter_Update(baseOptions?: Apollo.MutationHookOptions<BookChapter_Update, BookChapter_UpdateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookChapter_Update, BookChapter_UpdateVariables>(BookChapter_UpdateDocument, options);
      }
export type BookChapter_UpdateHookResult = ReturnType<typeof useBookChapter_Update>;
export type BookChapter_UpdateMutationResult = Apollo.MutationResult<BookChapter_Update>;
export type BookChapter_UpdateMutationOptions = Apollo.BaseMutationOptions<BookChapter_Update, BookChapter_UpdateVariables>;
export const Book_CreateDocument = gql`
    mutation Book_create($input: CreatePrivateBookInput!) {
  book_create(input: $input) {
    id
    author
    name
    languageCode
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
    `;
export type Book_CreateMutationFn = Apollo.MutationFunction<Book_Create, Book_CreateVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Book_Create, Book_CreateVariables>(Book_CreateDocument, options);
      }
export type Book_CreateHookResult = ReturnType<typeof useBook_Create>;
export type Book_CreateMutationResult = Apollo.MutationResult<Book_Create>;
export type Book_CreateMutationOptions = Apollo.BaseMutationOptions<Book_Create, Book_CreateVariables>;
export const Book_DeleteDocument = gql`
    mutation Book_delete($input: DeletePrivateBookInput!) {
  book_delete(input: $input)
}
    `;
export type Book_DeleteMutationFn = Apollo.MutationFunction<Book_Delete, Book_DeleteVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Book_Delete, Book_DeleteVariables>(Book_DeleteDocument, options);
      }
export type Book_DeleteHookResult = ReturnType<typeof useBook_Delete>;
export type Book_DeleteMutationResult = Apollo.MutationResult<Book_Delete>;
export type Book_DeleteMutationOptions = Apollo.BaseMutationOptions<Book_Delete, Book_DeleteVariables>;
export const Book_GetDocument = gql`
    query Book_get($input: GetPrivateBookInput!) {
  book_get(input: $input) {
    id
    author
    name
    languageCode
    note
    userId
    freeToUse
    coverUrl
    fileName
    isFileUploaded
    chapters {
      id
      bookId
      name
      header
      note
    }
  }
}
    `;

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
export function useBook_Get(baseOptions: Apollo.QueryHookOptions<Book_Get, Book_GetVariables> & ({ variables: Book_GetVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options);
      }
export function useBook_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Book_Get, Book_GetVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options);
        }
// @ts-ignore
export function useBook_GetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Book_Get, Book_GetVariables>): Apollo.UseSuspenseQueryResult<Book_Get, Book_GetVariables>;
export function useBook_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_Get, Book_GetVariables>): Apollo.UseSuspenseQueryResult<Book_Get | undefined, Book_GetVariables>;
export function useBook_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_Get, Book_GetVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Book_Get, Book_GetVariables>(Book_GetDocument, options);
        }
export type Book_GetHookResult = ReturnType<typeof useBook_Get>;
export type Book_GetLazyQueryHookResult = ReturnType<typeof useBook_GetLazyQuery>;
export type Book_GetSuspenseQueryHookResult = ReturnType<typeof useBook_GetSuspenseQuery>;
export type Book_GetQueryResult = Apollo.QueryResult<Book_Get, Book_GetVariables>;
export const Book_GetUserBooksDocument = gql`
    query Book_getUserBooks {
  book_user_books {
    id
    author
    name
    languageCode
    note
    userId
    freeToUse
    coverUrl
    fileName
    isFileUploaded
    chapters {
      id
      bookId
      name
      header
      note
    }
  }
}
    `;

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
export function useBook_GetUserBooks(baseOptions?: Apollo.QueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options);
      }
export function useBook_GetUserBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options);
        }
// @ts-ignore
export function useBook_GetUserBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>): Apollo.UseSuspenseQueryResult<Book_GetUserBooks, Book_GetUserBooksVariables>;
export function useBook_GetUserBooksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>): Apollo.UseSuspenseQueryResult<Book_GetUserBooks | undefined, Book_GetUserBooksVariables>;
export function useBook_GetUserBooksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetUserBooks, Book_GetUserBooksVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Book_GetUserBooks, Book_GetUserBooksVariables>(Book_GetUserBooksDocument, options);
        }
export type Book_GetUserBooksHookResult = ReturnType<typeof useBook_GetUserBooks>;
export type Book_GetUserBooksLazyQueryHookResult = ReturnType<typeof useBook_GetUserBooksLazyQuery>;
export type Book_GetUserBooksSuspenseQueryHookResult = ReturnType<typeof useBook_GetUserBooksSuspenseQuery>;
export type Book_GetUserBooksQueryResult = Apollo.QueryResult<Book_GetUserBooks, Book_GetUserBooksVariables>;
export const Book_UpdateDocument = gql`
    mutation Book_update($input: UpdatePrivateBookInput!) {
  book_update(input: $input) {
    id
    author
    name
    languageCode
    note
    userId
    coverUrl
    uploadUrl
    fileName
    fileS3Key
    isFileUploaded
    chapters {
      id
      bookId
      name
      header
      note
    }
  }
}
    `;
export type Book_UpdateMutationFn = Apollo.MutationFunction<Book_Update, Book_UpdateVariables>;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Book_Update, Book_UpdateVariables>(Book_UpdateDocument, options);
      }
export type Book_UpdateHookResult = ReturnType<typeof useBook_Update>;
export type Book_UpdateMutationResult = Apollo.MutationResult<Book_Update>;
export type Book_UpdateMutationOptions = Apollo.BaseMutationOptions<Book_Update, Book_UpdateVariables>;
export const Book_GetBookPublicDocument = gql`
    query Book_getBookPublic($input: GetBookPublicInput!) {
  book_public_get_book(input: $input) {
    id
    author
    name
    languageCode
    note
    covers
    coverBackgroundColor
    freeToUse
    chapters {
      id
      bookId
      name
      header
      note
    }
  }
}
    `;

/**
 * __useBook_GetBookPublic__
 *
 * To run a query within a React component, call `useBook_GetBookPublic` and pass it any options that fit your needs.
 * When your component renders, `useBook_GetBookPublic` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBook_GetBookPublic({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBook_GetBookPublic(baseOptions: Apollo.QueryHookOptions<Book_GetBookPublic, Book_GetBookPublicVariables> & ({ variables: Book_GetBookPublicVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Book_GetBookPublic, Book_GetBookPublicVariables>(Book_GetBookPublicDocument, options);
      }
export function useBook_GetBookPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Book_GetBookPublic, Book_GetBookPublicVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Book_GetBookPublic, Book_GetBookPublicVariables>(Book_GetBookPublicDocument, options);
        }
// @ts-ignore
export function useBook_GetBookPublicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Book_GetBookPublic, Book_GetBookPublicVariables>): Apollo.UseSuspenseQueryResult<Book_GetBookPublic, Book_GetBookPublicVariables>;
export function useBook_GetBookPublicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetBookPublic, Book_GetBookPublicVariables>): Apollo.UseSuspenseQueryResult<Book_GetBookPublic | undefined, Book_GetBookPublicVariables>;
export function useBook_GetBookPublicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetBookPublic, Book_GetBookPublicVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Book_GetBookPublic, Book_GetBookPublicVariables>(Book_GetBookPublicDocument, options);
        }
export type Book_GetBookPublicHookResult = ReturnType<typeof useBook_GetBookPublic>;
export type Book_GetBookPublicLazyQueryHookResult = ReturnType<typeof useBook_GetBookPublicLazyQuery>;
export type Book_GetBookPublicSuspenseQueryHookResult = ReturnType<typeof useBook_GetBookPublicSuspenseQuery>;
export type Book_GetBookPublicQueryResult = Apollo.QueryResult<Book_GetBookPublic, Book_GetBookPublicVariables>;
export const Book_GetBooksPublicDocument = gql`
    query Book_getBooksPublic {
  book_public_get_books {
    id
    author
    name
    languageCode
    note
    covers
    coverBackgroundColor
    freeToUse
    chapters {
      id
      bookId
      name
      header
      note
    }
  }
}
    `;

/**
 * __useBook_GetBooksPublic__
 *
 * To run a query within a React component, call `useBook_GetBooksPublic` and pass it any options that fit your needs.
 * When your component renders, `useBook_GetBooksPublic` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBook_GetBooksPublic({
 *   variables: {
 *   },
 * });
 */
export function useBook_GetBooksPublic(baseOptions?: Apollo.QueryHookOptions<Book_GetBooksPublic, Book_GetBooksPublicVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Book_GetBooksPublic, Book_GetBooksPublicVariables>(Book_GetBooksPublicDocument, options);
      }
export function useBook_GetBooksPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Book_GetBooksPublic, Book_GetBooksPublicVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Book_GetBooksPublic, Book_GetBooksPublicVariables>(Book_GetBooksPublicDocument, options);
        }
// @ts-ignore
export function useBook_GetBooksPublicSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Book_GetBooksPublic, Book_GetBooksPublicVariables>): Apollo.UseSuspenseQueryResult<Book_GetBooksPublic, Book_GetBooksPublicVariables>;
export function useBook_GetBooksPublicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetBooksPublic, Book_GetBooksPublicVariables>): Apollo.UseSuspenseQueryResult<Book_GetBooksPublic | undefined, Book_GetBooksPublicVariables>;
export function useBook_GetBooksPublicSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Book_GetBooksPublic, Book_GetBooksPublicVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Book_GetBooksPublic, Book_GetBooksPublicVariables>(Book_GetBooksPublicDocument, options);
        }
export type Book_GetBooksPublicHookResult = ReturnType<typeof useBook_GetBooksPublic>;
export type Book_GetBooksPublicLazyQueryHookResult = ReturnType<typeof useBook_GetBooksPublicLazyQuery>;
export type Book_GetBooksPublicSuspenseQueryHookResult = ReturnType<typeof useBook_GetBooksPublicSuspenseQuery>;
export type Book_GetBooksPublicQueryResult = Apollo.QueryResult<Book_GetBooksPublic, Book_GetBooksPublicVariables>;
export const Flashcard_AddDocument = gql`
    mutation Flashcard_add($input: AddFlashcardInput!) {
  flashcard_add(input: $input) {
    id
    languageCode
    sentenceText
    sentenceTranslation
    phrase
    phraseStartOffset
    phraseEndOffset
    phraseTranslation
    phraseTranscription
    examples {
      text
      translate
    }
    bookPrivateId
    bookPublicId
    videoPrivateId
    videoPublicId
    sentencePhraseTranslationId
    createdAt
  }
}
    `;
export type Flashcard_AddMutationFn = Apollo.MutationFunction<Flashcard_Add, Flashcard_AddVariables>;

/**
 * __useFlashcard_Add__
 *
 * To run a mutation, you first call `useFlashcard_Add` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlashcard_Add` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flashcardAdd, { data, loading, error }] = useFlashcard_Add({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFlashcard_Add(baseOptions?: Apollo.MutationHookOptions<Flashcard_Add, Flashcard_AddVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Flashcard_Add, Flashcard_AddVariables>(Flashcard_AddDocument, options);
      }
export type Flashcard_AddHookResult = ReturnType<typeof useFlashcard_Add>;
export type Flashcard_AddMutationResult = Apollo.MutationResult<Flashcard_Add>;
export type Flashcard_AddMutationOptions = Apollo.BaseMutationOptions<Flashcard_Add, Flashcard_AddVariables>;
export const Flashcard_Get_MyDocument = gql`
    query Flashcard_get_my($input: GetMyFlashcardsInput!) {
  flashcard_get_my(input: $input) {
    id
    languageCode
    sentenceText
    sentenceTranslation
    phrase
    phraseStartOffset
    phraseEndOffset
    phraseTranslation
    phraseTranscription
    examples {
      text
      translate
    }
    bookPrivateId
    bookPublicId
    videoPrivateId
    videoPublicId
    sentencePhraseTranslationId
    createdAt
  }
}
    `;

/**
 * __useFlashcard_Get_My__
 *
 * To run a query within a React component, call `useFlashcard_Get_My` and pass it any options that fit your needs.
 * When your component renders, `useFlashcard_Get_My` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFlashcard_Get_My({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFlashcard_Get_My(baseOptions: Apollo.QueryHookOptions<Flashcard_Get_My, Flashcard_Get_MyVariables> & ({ variables: Flashcard_Get_MyVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Flashcard_Get_My, Flashcard_Get_MyVariables>(Flashcard_Get_MyDocument, options);
      }
export function useFlashcard_Get_MyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Flashcard_Get_My, Flashcard_Get_MyVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Flashcard_Get_My, Flashcard_Get_MyVariables>(Flashcard_Get_MyDocument, options);
        }
// @ts-ignore
export function useFlashcard_Get_MySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Flashcard_Get_My, Flashcard_Get_MyVariables>): Apollo.UseSuspenseQueryResult<Flashcard_Get_My, Flashcard_Get_MyVariables>;
export function useFlashcard_Get_MySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Flashcard_Get_My, Flashcard_Get_MyVariables>): Apollo.UseSuspenseQueryResult<Flashcard_Get_My | undefined, Flashcard_Get_MyVariables>;
export function useFlashcard_Get_MySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Flashcard_Get_My, Flashcard_Get_MyVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Flashcard_Get_My, Flashcard_Get_MyVariables>(Flashcard_Get_MyDocument, options);
        }
export type Flashcard_Get_MyHookResult = ReturnType<typeof useFlashcard_Get_My>;
export type Flashcard_Get_MyLazyQueryHookResult = ReturnType<typeof useFlashcard_Get_MyLazyQuery>;
export type Flashcard_Get_MySuspenseQueryHookResult = ReturnType<typeof useFlashcard_Get_MySuspenseQuery>;
export type Flashcard_Get_MyQueryResult = Apollo.QueryResult<Flashcard_Get_My, Flashcard_Get_MyVariables>;
export const Flashcard_RemoveDocument = gql`
    mutation Flashcard_remove($input: RemoveFlashcardInput!) {
  flashcard_remove(input: $input)
}
    `;
export type Flashcard_RemoveMutationFn = Apollo.MutationFunction<Flashcard_Remove, Flashcard_RemoveVariables>;

/**
 * __useFlashcard_Remove__
 *
 * To run a mutation, you first call `useFlashcard_Remove` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFlashcard_Remove` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [flashcardRemove, { data, loading, error }] = useFlashcard_Remove({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFlashcard_Remove(baseOptions?: Apollo.MutationHookOptions<Flashcard_Remove, Flashcard_RemoveVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Flashcard_Remove, Flashcard_RemoveVariables>(Flashcard_RemoveDocument, options);
      }
export type Flashcard_RemoveHookResult = ReturnType<typeof useFlashcard_Remove>;
export type Flashcard_RemoveMutationResult = Apollo.MutationResult<Flashcard_Remove>;
export type Flashcard_RemoveMutationOptions = Apollo.BaseMutationOptions<Flashcard_Remove, Flashcard_RemoveVariables>;
export const GrammarConcept_FetchDocument = gql`
    mutation GrammarConcept_fetch($input: FetchGrammarConceptsInput!) {
  grammar_concept_fetch(input: $input) {
    id
    sentenceText
    sourceLanguage
    grammarExtractionStatus
    grammarConcepts {
      id
      title
      slug
      category
      lemma
      order
      sourceLanguage
      targetLanguage
    }
    missingGrammarConcepts {
      category
      lemma
    }
  }
}
    `;
export type GrammarConcept_FetchMutationFn = Apollo.MutationFunction<GrammarConcept_Fetch, GrammarConcept_FetchVariables>;

/**
 * __useGrammarConcept_Fetch__
 *
 * To run a mutation, you first call `useGrammarConcept_Fetch` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrammarConcept_Fetch` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grammarConceptFetch, { data, loading, error }] = useGrammarConcept_Fetch({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrammarConcept_Fetch(baseOptions?: Apollo.MutationHookOptions<GrammarConcept_Fetch, GrammarConcept_FetchVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GrammarConcept_Fetch, GrammarConcept_FetchVariables>(GrammarConcept_FetchDocument, options);
      }
export type GrammarConcept_FetchHookResult = ReturnType<typeof useGrammarConcept_Fetch>;
export type GrammarConcept_FetchMutationResult = Apollo.MutationResult<GrammarConcept_Fetch>;
export type GrammarConcept_FetchMutationOptions = Apollo.BaseMutationOptions<GrammarConcept_Fetch, GrammarConcept_FetchVariables>;
export const Language_Get_LanguagesDocument = gql`
    query Language_get_languages {
  language_get_languages {
    code
    nameRus
    nameEng
  }
}
    `;

/**
 * __useLanguage_Get_Languages__
 *
 * To run a query within a React component, call `useLanguage_Get_Languages` and pass it any options that fit your needs.
 * When your component renders, `useLanguage_Get_Languages` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguage_Get_Languages({
 *   variables: {
 *   },
 * });
 */
export function useLanguage_Get_Languages(baseOptions?: Apollo.QueryHookOptions<Language_Get_Languages, Language_Get_LanguagesVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Language_Get_Languages, Language_Get_LanguagesVariables>(Language_Get_LanguagesDocument, options);
      }
export function useLanguage_Get_LanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Language_Get_Languages, Language_Get_LanguagesVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Language_Get_Languages, Language_Get_LanguagesVariables>(Language_Get_LanguagesDocument, options);
        }
// @ts-ignore
export function useLanguage_Get_LanguagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Language_Get_Languages, Language_Get_LanguagesVariables>): Apollo.UseSuspenseQueryResult<Language_Get_Languages, Language_Get_LanguagesVariables>;
export function useLanguage_Get_LanguagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Language_Get_Languages, Language_Get_LanguagesVariables>): Apollo.UseSuspenseQueryResult<Language_Get_Languages | undefined, Language_Get_LanguagesVariables>;
export function useLanguage_Get_LanguagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Language_Get_Languages, Language_Get_LanguagesVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Language_Get_Languages, Language_Get_LanguagesVariables>(Language_Get_LanguagesDocument, options);
        }
export type Language_Get_LanguagesHookResult = ReturnType<typeof useLanguage_Get_Languages>;
export type Language_Get_LanguagesLazyQueryHookResult = ReturnType<typeof useLanguage_Get_LanguagesLazyQuery>;
export type Language_Get_LanguagesSuspenseQueryHookResult = ReturnType<typeof useLanguage_Get_LanguagesSuspenseQuery>;
export type Language_Get_LanguagesQueryResult = Apollo.QueryResult<Language_Get_Languages, Language_Get_LanguagesVariables>;
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
export const Sentence_Chat_Create_ThreadDocument = gql`
    mutation Sentence_chat_create_thread($input: CreateSentenceChatThreadInput!) {
  sentence_chat_create_thread(input: $input) {
    id
    sentenceId
    messages {
      id
      threadId
      role
      content
      status
      errorMessage
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export type Sentence_Chat_Create_ThreadMutationFn = Apollo.MutationFunction<Sentence_Chat_Create_Thread, Sentence_Chat_Create_ThreadVariables>;

/**
 * __useSentence_Chat_Create_Thread__
 *
 * To run a mutation, you first call `useSentence_Chat_Create_Thread` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSentence_Chat_Create_Thread` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sentenceChatCreateThread, { data, loading, error }] = useSentence_Chat_Create_Thread({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSentence_Chat_Create_Thread(baseOptions?: Apollo.MutationHookOptions<Sentence_Chat_Create_Thread, Sentence_Chat_Create_ThreadVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Sentence_Chat_Create_Thread, Sentence_Chat_Create_ThreadVariables>(Sentence_Chat_Create_ThreadDocument, options);
      }
export type Sentence_Chat_Create_ThreadHookResult = ReturnType<typeof useSentence_Chat_Create_Thread>;
export type Sentence_Chat_Create_ThreadMutationResult = Apollo.MutationResult<Sentence_Chat_Create_Thread>;
export type Sentence_Chat_Create_ThreadMutationOptions = Apollo.BaseMutationOptions<Sentence_Chat_Create_Thread, Sentence_Chat_Create_ThreadVariables>;
export const Sentence_Chat_Create_User_MessageDocument = gql`
    mutation Sentence_chat_create_user_message($input: CreateSentenceChatUserMessageInput!) {
  sentence_chat_create_user_message(input: $input) {
    id
    threadId
    role
    content
    status
    errorMessage
    createdAt
    updatedAt
  }
}
    `;
export type Sentence_Chat_Create_User_MessageMutationFn = Apollo.MutationFunction<Sentence_Chat_Create_User_Message, Sentence_Chat_Create_User_MessageVariables>;

/**
 * __useSentence_Chat_Create_User_Message__
 *
 * To run a mutation, you first call `useSentence_Chat_Create_User_Message` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSentence_Chat_Create_User_Message` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sentenceChatCreateUserMessage, { data, loading, error }] = useSentence_Chat_Create_User_Message({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSentence_Chat_Create_User_Message(baseOptions?: Apollo.MutationHookOptions<Sentence_Chat_Create_User_Message, Sentence_Chat_Create_User_MessageVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Sentence_Chat_Create_User_Message, Sentence_Chat_Create_User_MessageVariables>(Sentence_Chat_Create_User_MessageDocument, options);
      }
export type Sentence_Chat_Create_User_MessageHookResult = ReturnType<typeof useSentence_Chat_Create_User_Message>;
export type Sentence_Chat_Create_User_MessageMutationResult = Apollo.MutationResult<Sentence_Chat_Create_User_Message>;
export type Sentence_Chat_Create_User_MessageMutationOptions = Apollo.BaseMutationOptions<Sentence_Chat_Create_User_Message, Sentence_Chat_Create_User_MessageVariables>;
export const Sentence_Chat_Get_ThreadDocument = gql`
    query Sentence_chat_get_thread($input: GetSentenceChatThreadInput!) {
  sentence_chat_get_thread(input: $input) {
    id
    sentenceId
    messages {
      id
      threadId
      role
      content
      status
      errorMessage
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSentence_Chat_Get_Thread__
 *
 * To run a query within a React component, call `useSentence_Chat_Get_Thread` and pass it any options that fit your needs.
 * When your component renders, `useSentence_Chat_Get_Thread` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSentence_Chat_Get_Thread({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSentence_Chat_Get_Thread(baseOptions: Apollo.QueryHookOptions<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables> & ({ variables: Sentence_Chat_Get_ThreadVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>(Sentence_Chat_Get_ThreadDocument, options);
      }
export function useSentence_Chat_Get_ThreadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>(Sentence_Chat_Get_ThreadDocument, options);
        }
// @ts-ignore
export function useSentence_Chat_Get_ThreadSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>): Apollo.UseSuspenseQueryResult<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>;
export function useSentence_Chat_Get_ThreadSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>): Apollo.UseSuspenseQueryResult<Sentence_Chat_Get_Thread | undefined, Sentence_Chat_Get_ThreadVariables>;
export function useSentence_Chat_Get_ThreadSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>(Sentence_Chat_Get_ThreadDocument, options);
        }
export type Sentence_Chat_Get_ThreadHookResult = ReturnType<typeof useSentence_Chat_Get_Thread>;
export type Sentence_Chat_Get_ThreadLazyQueryHookResult = ReturnType<typeof useSentence_Chat_Get_ThreadLazyQuery>;
export type Sentence_Chat_Get_ThreadSuspenseQueryHookResult = ReturnType<typeof useSentence_Chat_Get_ThreadSuspenseQuery>;
export type Sentence_Chat_Get_ThreadQueryResult = Apollo.QueryResult<Sentence_Chat_Get_Thread, Sentence_Chat_Get_ThreadVariables>;
export const Transcription_CreateDocument = gql`
    mutation Transcription_create($input: CreateUniversalTranscriptionInput!) {
  create_transcription(input: $input) {
    id
    universalPhraseId
    ipa
    pinyin
  }
}
    `;
export type Transcription_CreateMutationFn = Apollo.MutationFunction<Transcription_Create, Transcription_CreateVariables>;

/**
 * __useTranscription_Create__
 *
 * To run a mutation, you first call `useTranscription_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranscription_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transcriptionCreate, { data, loading, error }] = useTranscription_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranscription_Create(baseOptions?: Apollo.MutationHookOptions<Transcription_Create, Transcription_CreateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Transcription_Create, Transcription_CreateVariables>(Transcription_CreateDocument, options);
      }
export type Transcription_CreateHookResult = ReturnType<typeof useTranscription_Create>;
export type Transcription_CreateMutationResult = Apollo.MutationResult<Transcription_Create>;
export type Transcription_CreateMutationOptions = Apollo.BaseMutationOptions<Transcription_Create, Transcription_CreateVariables>;
export const Translate_Get_Phrase_TranslationDocument = gql`
    query Translate_get_phrase_translation($input: GetPhraseTranslationInput!) {
  translate_get_phrase_translation(input: $input) {
    id
    sentenceId
    phrase
    phraseStartOffset
    phraseEndOffset
    translate
    examples {
      text
      translate
    }
    status
    errorMessage
    createdAt
    updatedAt
    flashcardId
  }
}
    `;

/**
 * __useTranslate_Get_Phrase_Translation__
 *
 * To run a query within a React component, call `useTranslate_Get_Phrase_Translation` and pass it any options that fit your needs.
 * When your component renders, `useTranslate_Get_Phrase_Translation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslate_Get_Phrase_Translation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslate_Get_Phrase_Translation(baseOptions: Apollo.QueryHookOptions<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables> & ({ variables: Translate_Get_Phrase_TranslationVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>(Translate_Get_Phrase_TranslationDocument, options);
      }
export function useTranslate_Get_Phrase_TranslationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>(Translate_Get_Phrase_TranslationDocument, options);
        }
// @ts-ignore
export function useTranslate_Get_Phrase_TranslationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>;
export function useTranslate_Get_Phrase_TranslationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Phrase_Translation | undefined, Translate_Get_Phrase_TranslationVariables>;
export function useTranslate_Get_Phrase_TranslationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>(Translate_Get_Phrase_TranslationDocument, options);
        }
export type Translate_Get_Phrase_TranslationHookResult = ReturnType<typeof useTranslate_Get_Phrase_Translation>;
export type Translate_Get_Phrase_TranslationLazyQueryHookResult = ReturnType<typeof useTranslate_Get_Phrase_TranslationLazyQuery>;
export type Translate_Get_Phrase_TranslationSuspenseQueryHookResult = ReturnType<typeof useTranslate_Get_Phrase_TranslationSuspenseQuery>;
export type Translate_Get_Phrase_TranslationQueryResult = Apollo.QueryResult<Translate_Get_Phrase_Translation, Translate_Get_Phrase_TranslationVariables>;
export const Translate_Get_Phrase_Translations_By_SentenceDocument = gql`
    query Translate_get_phrase_translations_by_sentence($input: GetPhraseTranslationsBySentenceInput!) {
  translate_get_phrase_translations_by_sentence(input: $input) {
    id
    sentenceId
    phrase
    phraseStartOffset
    phraseEndOffset
    translate
    examples {
      text
      translate
    }
    status
    errorMessage
    createdAt
    updatedAt
    flashcardId
  }
}
    `;

/**
 * __useTranslate_Get_Phrase_Translations_By_Sentence__
 *
 * To run a query within a React component, call `useTranslate_Get_Phrase_Translations_By_Sentence` and pass it any options that fit your needs.
 * When your component renders, `useTranslate_Get_Phrase_Translations_By_Sentence` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslate_Get_Phrase_Translations_By_Sentence({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslate_Get_Phrase_Translations_By_Sentence(baseOptions: Apollo.QueryHookOptions<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables> & ({ variables: Translate_Get_Phrase_Translations_By_SentenceVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>(Translate_Get_Phrase_Translations_By_SentenceDocument, options);
      }
export function useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>(Translate_Get_Phrase_Translations_By_SentenceDocument, options);
        }
// @ts-ignore
export function useTranslate_Get_Phrase_Translations_By_SentenceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>;
export function useTranslate_Get_Phrase_Translations_By_SentenceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Phrase_Translations_By_Sentence | undefined, Translate_Get_Phrase_Translations_By_SentenceVariables>;
export function useTranslate_Get_Phrase_Translations_By_SentenceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>(Translate_Get_Phrase_Translations_By_SentenceDocument, options);
        }
export type Translate_Get_Phrase_Translations_By_SentenceHookResult = ReturnType<typeof useTranslate_Get_Phrase_Translations_By_Sentence>;
export type Translate_Get_Phrase_Translations_By_SentenceLazyQueryHookResult = ReturnType<typeof useTranslate_Get_Phrase_Translations_By_SentenceLazyQuery>;
export type Translate_Get_Phrase_Translations_By_SentenceSuspenseQueryHookResult = ReturnType<typeof useTranslate_Get_Phrase_Translations_By_SentenceSuspenseQuery>;
export type Translate_Get_Phrase_Translations_By_SentenceQueryResult = Apollo.QueryResult<Translate_Get_Phrase_Translations_By_Sentence, Translate_Get_Phrase_Translations_By_SentenceVariables>;
export const Translate_Get_Sentence_TranslationDocument = gql`
    query Translate_get_sentence_translation($input: GetSentenceTranslationInput!) {
  translate_get_sentence_translation(input: $input) {
    sentenceId
    translation
  }
}
    `;

/**
 * __useTranslate_Get_Sentence_Translation__
 *
 * To run a query within a React component, call `useTranslate_Get_Sentence_Translation` and pass it any options that fit your needs.
 * When your component renders, `useTranslate_Get_Sentence_Translation` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslate_Get_Sentence_Translation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslate_Get_Sentence_Translation(baseOptions: Apollo.QueryHookOptions<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables> & ({ variables: Translate_Get_Sentence_TranslationVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>(Translate_Get_Sentence_TranslationDocument, options);
      }
export function useTranslate_Get_Sentence_TranslationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>(Translate_Get_Sentence_TranslationDocument, options);
        }
// @ts-ignore
export function useTranslate_Get_Sentence_TranslationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>;
export function useTranslate_Get_Sentence_TranslationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>): Apollo.UseSuspenseQueryResult<Translate_Get_Sentence_Translation | undefined, Translate_Get_Sentence_TranslationVariables>;
export function useTranslate_Get_Sentence_TranslationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>(Translate_Get_Sentence_TranslationDocument, options);
        }
export type Translate_Get_Sentence_TranslationHookResult = ReturnType<typeof useTranslate_Get_Sentence_Translation>;
export type Translate_Get_Sentence_TranslationLazyQueryHookResult = ReturnType<typeof useTranslate_Get_Sentence_TranslationLazyQuery>;
export type Translate_Get_Sentence_TranslationSuspenseQueryHookResult = ReturnType<typeof useTranslate_Get_Sentence_TranslationSuspenseQuery>;
export type Translate_Get_Sentence_TranslationQueryResult = Apollo.QueryResult<Translate_Get_Sentence_Translation, Translate_Get_Sentence_TranslationVariables>;
export const Translate_Translate_PhraseDocument = gql`
    mutation Translate_translate_phrase($input: TranslatePhraseInput!) {
  translate_translate_phrase(input: $input) {
    id
    sentenceId
    phrase
    phraseStartOffset
    phraseEndOffset
    translate
    examples {
      text
      translate
    }
    status
    errorMessage
    createdAt
    updatedAt
    flashcardId
  }
}
    `;
export type Translate_Translate_PhraseMutationFn = Apollo.MutationFunction<Translate_Translate_Phrase, Translate_Translate_PhraseVariables>;

/**
 * __useTranslate_Translate_Phrase__
 *
 * To run a mutation, you first call `useTranslate_Translate_Phrase` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranslate_Translate_Phrase` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [translateTranslatePhrase, { data, loading, error }] = useTranslate_Translate_Phrase({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslate_Translate_Phrase(baseOptions?: Apollo.MutationHookOptions<Translate_Translate_Phrase, Translate_Translate_PhraseVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Translate_Translate_Phrase, Translate_Translate_PhraseVariables>(Translate_Translate_PhraseDocument, options);
      }
export type Translate_Translate_PhraseHookResult = ReturnType<typeof useTranslate_Translate_Phrase>;
export type Translate_Translate_PhraseMutationResult = Apollo.MutationResult<Translate_Translate_Phrase>;
export type Translate_Translate_PhraseMutationOptions = Apollo.BaseMutationOptions<Translate_Translate_Phrase, Translate_Translate_PhraseVariables>;
export const Translate_Translate_SentenceDocument = gql`
    mutation Translate_translate_sentence($input: TranslateSentenceInput!) {
  translate_translate_sentence(input: $input) {
    sentenceId
    translation
  }
}
    `;
export type Translate_Translate_SentenceMutationFn = Apollo.MutationFunction<Translate_Translate_Sentence, Translate_Translate_SentenceVariables>;

/**
 * __useTranslate_Translate_Sentence__
 *
 * To run a mutation, you first call `useTranslate_Translate_Sentence` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTranslate_Translate_Sentence` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [translateTranslateSentence, { data, loading, error }] = useTranslate_Translate_Sentence({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTranslate_Translate_Sentence(baseOptions?: Apollo.MutationHookOptions<Translate_Translate_Sentence, Translate_Translate_SentenceVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Translate_Translate_Sentence, Translate_Translate_SentenceVariables>(Translate_Translate_SentenceDocument, options);
      }
export type Translate_Translate_SentenceHookResult = ReturnType<typeof useTranslate_Translate_Sentence>;
export type Translate_Translate_SentenceMutationResult = Apollo.MutationResult<Translate_Translate_Sentence>;
export type Translate_Translate_SentenceMutationOptions = Apollo.BaseMutationOptions<Translate_Translate_Sentence, Translate_Translate_SentenceVariables>;
export const UniversalPhrase_CreateDocument = gql`
    mutation UniversalPhrase_create($input: CreateUniversalPhraseInput!) {
  universal_phrase_create(input: $input) {
    id
    text
    sourceLanguageCode
    transcription {
      id
      universalPhraseId
      ipa
      pinyin
    }
    audioPronunciation {
      id
      universalPhraseId
      audioUrl
    }
  }
}
    `;
export type UniversalPhrase_CreateMutationFn = Apollo.MutationFunction<UniversalPhrase_Create, UniversalPhrase_CreateVariables>;

/**
 * __useUniversalPhrase_Create__
 *
 * To run a mutation, you first call `useUniversalPhrase_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUniversalPhrase_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [universalPhraseCreate, { data, loading, error }] = useUniversalPhrase_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUniversalPhrase_Create(baseOptions?: Apollo.MutationHookOptions<UniversalPhrase_Create, UniversalPhrase_CreateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UniversalPhrase_Create, UniversalPhrase_CreateVariables>(UniversalPhrase_CreateDocument, options);
      }
export type UniversalPhrase_CreateHookResult = ReturnType<typeof useUniversalPhrase_Create>;
export type UniversalPhrase_CreateMutationResult = Apollo.MutationResult<UniversalPhrase_Create>;
export type UniversalPhrase_CreateMutationOptions = Apollo.BaseMutationOptions<UniversalPhrase_Create, UniversalPhrase_CreateVariables>;
export const UniversalPhrase_GetDocument = gql`
    query UniversalPhrase_get($input: GetUniversalPhraseInput!) {
  universal_phrase_get(input: $input) {
    id
    text
    sourceLanguageCode
    transcription {
      id
      universalPhraseId
      ipa
      pinyin
    }
    audioPronunciation {
      id
      universalPhraseId
      audioUrl
    }
  }
}
    `;

/**
 * __useUniversalPhrase_Get__
 *
 * To run a query within a React component, call `useUniversalPhrase_Get` and pass it any options that fit your needs.
 * When your component renders, `useUniversalPhrase_Get` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUniversalPhrase_Get({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUniversalPhrase_Get(baseOptions: Apollo.QueryHookOptions<UniversalPhrase_Get, UniversalPhrase_GetVariables> & ({ variables: UniversalPhrase_GetVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UniversalPhrase_Get, UniversalPhrase_GetVariables>(UniversalPhrase_GetDocument, options);
      }
export function useUniversalPhrase_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UniversalPhrase_Get, UniversalPhrase_GetVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UniversalPhrase_Get, UniversalPhrase_GetVariables>(UniversalPhrase_GetDocument, options);
        }
// @ts-ignore
export function useUniversalPhrase_GetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UniversalPhrase_Get, UniversalPhrase_GetVariables>): Apollo.UseSuspenseQueryResult<UniversalPhrase_Get, UniversalPhrase_GetVariables>;
export function useUniversalPhrase_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UniversalPhrase_Get, UniversalPhrase_GetVariables>): Apollo.UseSuspenseQueryResult<UniversalPhrase_Get | undefined, UniversalPhrase_GetVariables>;
export function useUniversalPhrase_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UniversalPhrase_Get, UniversalPhrase_GetVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UniversalPhrase_Get, UniversalPhrase_GetVariables>(UniversalPhrase_GetDocument, options);
        }
export type UniversalPhrase_GetHookResult = ReturnType<typeof useUniversalPhrase_Get>;
export type UniversalPhrase_GetLazyQueryHookResult = ReturnType<typeof useUniversalPhrase_GetLazyQuery>;
export type UniversalPhrase_GetSuspenseQueryHookResult = ReturnType<typeof useUniversalPhrase_GetSuspenseQuery>;
export type UniversalPhrase_GetQueryResult = Apollo.QueryResult<UniversalPhrase_Get, UniversalPhrase_GetVariables>;
export const VideoPrivate_CreateDocument = gql`
    mutation VideoPrivate_create($input: CreatePrivateVideoInput!) {
  video_private_create(input: $input) {
    id
    name
    year
    languageCode
    contentType
    originalContent
    processedContent
    userId
  }
}
    `;
export type VideoPrivate_CreateMutationFn = Apollo.MutationFunction<VideoPrivate_Create, VideoPrivate_CreateVariables>;

/**
 * __useVideoPrivate_Create__
 *
 * To run a mutation, you first call `useVideoPrivate_Create` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_Create` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoPrivateCreate, { data, loading, error }] = useVideoPrivate_Create({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_Create(baseOptions?: Apollo.MutationHookOptions<VideoPrivate_Create, VideoPrivate_CreateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoPrivate_Create, VideoPrivate_CreateVariables>(VideoPrivate_CreateDocument, options);
      }
export type VideoPrivate_CreateHookResult = ReturnType<typeof useVideoPrivate_Create>;
export type VideoPrivate_CreateMutationResult = Apollo.MutationResult<VideoPrivate_Create>;
export type VideoPrivate_CreateMutationOptions = Apollo.BaseMutationOptions<VideoPrivate_Create, VideoPrivate_CreateVariables>;
export const VideoPrivate_DeleteDocument = gql`
    mutation VideoPrivate_delete($input: DeletePrivateVideoInput!) {
  video_private_delete(input: $input)
}
    `;
export type VideoPrivate_DeleteMutationFn = Apollo.MutationFunction<VideoPrivate_Delete, VideoPrivate_DeleteVariables>;

/**
 * __useVideoPrivate_Delete__
 *
 * To run a mutation, you first call `useVideoPrivate_Delete` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_Delete` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoPrivateDelete, { data, loading, error }] = useVideoPrivate_Delete({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_Delete(baseOptions?: Apollo.MutationHookOptions<VideoPrivate_Delete, VideoPrivate_DeleteVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoPrivate_Delete, VideoPrivate_DeleteVariables>(VideoPrivate_DeleteDocument, options);
      }
export type VideoPrivate_DeleteHookResult = ReturnType<typeof useVideoPrivate_Delete>;
export type VideoPrivate_DeleteMutationResult = Apollo.MutationResult<VideoPrivate_Delete>;
export type VideoPrivate_DeleteMutationOptions = Apollo.BaseMutationOptions<VideoPrivate_Delete, VideoPrivate_DeleteVariables>;
export const VideoPrivate_GenerateSubtitlesDocument = gql`
    mutation VideoPrivate_generateSubtitles($input: GenerateSubtitlesForPrivateVideoInput!) {
  video_private_generate_subtitles(input: $input) {
    videoId
    status
    error
    startedAt
    jobId
  }
}
    `;
export type VideoPrivate_GenerateSubtitlesMutationFn = Apollo.MutationFunction<VideoPrivate_GenerateSubtitles, VideoPrivate_GenerateSubtitlesVariables>;

/**
 * __useVideoPrivate_GenerateSubtitles__
 *
 * To run a mutation, you first call `useVideoPrivate_GenerateSubtitles` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_GenerateSubtitles` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoPrivateGenerateSubtitles, { data, loading, error }] = useVideoPrivate_GenerateSubtitles({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_GenerateSubtitles(baseOptions?: Apollo.MutationHookOptions<VideoPrivate_GenerateSubtitles, VideoPrivate_GenerateSubtitlesVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoPrivate_GenerateSubtitles, VideoPrivate_GenerateSubtitlesVariables>(VideoPrivate_GenerateSubtitlesDocument, options);
      }
export type VideoPrivate_GenerateSubtitlesHookResult = ReturnType<typeof useVideoPrivate_GenerateSubtitles>;
export type VideoPrivate_GenerateSubtitlesMutationResult = Apollo.MutationResult<VideoPrivate_GenerateSubtitles>;
export type VideoPrivate_GenerateSubtitlesMutationOptions = Apollo.BaseMutationOptions<VideoPrivate_GenerateSubtitles, VideoPrivate_GenerateSubtitlesVariables>;
export const VideoPrivate_GetDocument = gql`
    query VideoPrivate_get($input: GetPrivateVideoInput!) {
  video_private_get(input: $input) {
    id
    name
    year
    languageCode
    originalContent
    processedContent
    contentType
    userId
    fileName
    fileS3Key
    fileUrl
    isFileUploaded
    fileSizeMb
    freeToUse
    sentences {
      id
      sentenceTranslations {
        id
        translation
      }
      startOffset
      length
      orderIndex
      grammarConcepts {
        id
        title
        slug
        category
        lemma
        order
        sourceLanguage
        targetLanguage
      }
      missingGrammarConcepts {
        category
        lemma
      }
    }
    subtitles {
      id
      startTimeMs
      endTimeMs
      startOffset
      length
      orderIndex
    }
    subtitleSentenceInit {
      id
      subtitleId
      sentenceId
      startOffset
      length
    }
  }
}
    `;

/**
 * __useVideoPrivate_Get__
 *
 * To run a query within a React component, call `useVideoPrivate_Get` and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_Get` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoPrivate_Get({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_Get(baseOptions: Apollo.QueryHookOptions<VideoPrivate_Get, VideoPrivate_GetVariables> & ({ variables: VideoPrivate_GetVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoPrivate_Get, VideoPrivate_GetVariables>(VideoPrivate_GetDocument, options);
      }
export function useVideoPrivate_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoPrivate_Get, VideoPrivate_GetVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoPrivate_Get, VideoPrivate_GetVariables>(VideoPrivate_GetDocument, options);
        }
// @ts-ignore
export function useVideoPrivate_GetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VideoPrivate_Get, VideoPrivate_GetVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_Get, VideoPrivate_GetVariables>;
export function useVideoPrivate_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_Get, VideoPrivate_GetVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_Get | undefined, VideoPrivate_GetVariables>;
export function useVideoPrivate_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_Get, VideoPrivate_GetVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoPrivate_Get, VideoPrivate_GetVariables>(VideoPrivate_GetDocument, options);
        }
export type VideoPrivate_GetHookResult = ReturnType<typeof useVideoPrivate_Get>;
export type VideoPrivate_GetLazyQueryHookResult = ReturnType<typeof useVideoPrivate_GetLazyQuery>;
export type VideoPrivate_GetSuspenseQueryHookResult = ReturnType<typeof useVideoPrivate_GetSuspenseQuery>;
export type VideoPrivate_GetQueryResult = Apollo.QueryResult<VideoPrivate_Get, VideoPrivate_GetVariables>;
export const VideoPrivate_GetSubtitlesGenerationStatusDocument = gql`
    query VideoPrivate_getSubtitlesGenerationStatus($input: VideoPrivateSubtitlesStatusInput!) {
  video_private_get_subtitles_generation_status(input: $input) {
    videoId
    status
    error
    startedAt
    jobId
  }
}
    `;

/**
 * __useVideoPrivate_GetSubtitlesGenerationStatus__
 *
 * To run a query within a React component, call `useVideoPrivate_GetSubtitlesGenerationStatus` and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_GetSubtitlesGenerationStatus` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoPrivate_GetSubtitlesGenerationStatus({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_GetSubtitlesGenerationStatus(baseOptions: Apollo.QueryHookOptions<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables> & ({ variables: VideoPrivate_GetSubtitlesGenerationStatusVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>(VideoPrivate_GetSubtitlesGenerationStatusDocument, options);
      }
export function useVideoPrivate_GetSubtitlesGenerationStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>(VideoPrivate_GetSubtitlesGenerationStatusDocument, options);
        }
// @ts-ignore
export function useVideoPrivate_GetSubtitlesGenerationStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>;
export function useVideoPrivate_GetSubtitlesGenerationStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_GetSubtitlesGenerationStatus | undefined, VideoPrivate_GetSubtitlesGenerationStatusVariables>;
export function useVideoPrivate_GetSubtitlesGenerationStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>(VideoPrivate_GetSubtitlesGenerationStatusDocument, options);
        }
export type VideoPrivate_GetSubtitlesGenerationStatusHookResult = ReturnType<typeof useVideoPrivate_GetSubtitlesGenerationStatus>;
export type VideoPrivate_GetSubtitlesGenerationStatusLazyQueryHookResult = ReturnType<typeof useVideoPrivate_GetSubtitlesGenerationStatusLazyQuery>;
export type VideoPrivate_GetSubtitlesGenerationStatusSuspenseQueryHookResult = ReturnType<typeof useVideoPrivate_GetSubtitlesGenerationStatusSuspenseQuery>;
export type VideoPrivate_GetSubtitlesGenerationStatusQueryResult = Apollo.QueryResult<VideoPrivate_GetSubtitlesGenerationStatus, VideoPrivate_GetSubtitlesGenerationStatusVariables>;
export const VideoPrivate_GetUserVideosDocument = gql`
    query VideoPrivate_getUserVideos {
  video_private_user_videos {
    id
    name
    year
    languageCode
    contentType
    originalContent
    userId
    fileName
    fileS3Key
    fileUrl
    isFileUploaded
    fileSizeMb
  }
}
    `;

/**
 * __useVideoPrivate_GetUserVideos__
 *
 * To run a query within a React component, call `useVideoPrivate_GetUserVideos` and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_GetUserVideos` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoPrivate_GetUserVideos({
 *   variables: {
 *   },
 * });
 */
export function useVideoPrivate_GetUserVideos(baseOptions?: Apollo.QueryHookOptions<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>(VideoPrivate_GetUserVideosDocument, options);
      }
export function useVideoPrivate_GetUserVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>(VideoPrivate_GetUserVideosDocument, options);
        }
// @ts-ignore
export function useVideoPrivate_GetUserVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>;
export function useVideoPrivate_GetUserVideosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>): Apollo.UseSuspenseQueryResult<VideoPrivate_GetUserVideos | undefined, VideoPrivate_GetUserVideosVariables>;
export function useVideoPrivate_GetUserVideosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>(VideoPrivate_GetUserVideosDocument, options);
        }
export type VideoPrivate_GetUserVideosHookResult = ReturnType<typeof useVideoPrivate_GetUserVideos>;
export type VideoPrivate_GetUserVideosLazyQueryHookResult = ReturnType<typeof useVideoPrivate_GetUserVideosLazyQuery>;
export type VideoPrivate_GetUserVideosSuspenseQueryHookResult = ReturnType<typeof useVideoPrivate_GetUserVideosSuspenseQuery>;
export type VideoPrivate_GetUserVideosQueryResult = Apollo.QueryResult<VideoPrivate_GetUserVideos, VideoPrivate_GetUserVideosVariables>;
export const VideoPrivate_UpdateDocument = gql`
    mutation VideoPrivate_update($input: UpdatePrivateVideoInput!) {
  video_private_update(input: $input) {
    id
    name
    year
    languageCode
    contentType
    originalContent
    processedContent
    userId
    uploadUrl
    fileSizeMb
  }
}
    `;
export type VideoPrivate_UpdateMutationFn = Apollo.MutationFunction<VideoPrivate_Update, VideoPrivate_UpdateVariables>;

/**
 * __useVideoPrivate_Update__
 *
 * To run a mutation, you first call `useVideoPrivate_Update` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVideoPrivate_Update` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [videoPrivateUpdate, { data, loading, error }] = useVideoPrivate_Update({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPrivate_Update(baseOptions?: Apollo.MutationHookOptions<VideoPrivate_Update, VideoPrivate_UpdateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VideoPrivate_Update, VideoPrivate_UpdateVariables>(VideoPrivate_UpdateDocument, options);
      }
export type VideoPrivate_UpdateHookResult = ReturnType<typeof useVideoPrivate_Update>;
export type VideoPrivate_UpdateMutationResult = Apollo.MutationResult<VideoPrivate_Update>;
export type VideoPrivate_UpdateMutationOptions = Apollo.BaseMutationOptions<VideoPrivate_Update, VideoPrivate_UpdateVariables>;
export const VideoPublic_GetDocument = gql`
    query VideoPublic_get($input: GetPublicVideoInput!) {
  video_public_get(input: $input) {
    id
    name
    year
    languageCode
    note
    covers
    coverBackgroundColor
    originalContent
    processedContent
    contentType
    fileName
    fileS3Key
    fileUrl
    freeToUse
    sentences {
      id
      startOffset
      length
      orderIndex
      sentenceTranslations {
        id
        translation
      }
      grammarConcepts {
        id
        title
        slug
        category
        lemma
        order
        sourceLanguage
        targetLanguage
      }
      missingGrammarConcepts {
        category
        lemma
      }
    }
    subtitles {
      id
      startTimeMs
      endTimeMs
      startOffset
      length
      orderIndex
    }
    subtitleSentenceInit {
      id
      subtitleId
      sentenceId
      startOffset
      length
    }
  }
}
    `;

/**
 * __useVideoPublic_Get__
 *
 * To run a query within a React component, call `useVideoPublic_Get` and pass it any options that fit your needs.
 * When your component renders, `useVideoPublic_Get` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoPublic_Get({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVideoPublic_Get(baseOptions: Apollo.QueryHookOptions<VideoPublic_Get, VideoPublic_GetVariables> & ({ variables: VideoPublic_GetVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoPublic_Get, VideoPublic_GetVariables>(VideoPublic_GetDocument, options);
      }
export function useVideoPublic_GetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoPublic_Get, VideoPublic_GetVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoPublic_Get, VideoPublic_GetVariables>(VideoPublic_GetDocument, options);
        }
// @ts-ignore
export function useVideoPublic_GetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VideoPublic_Get, VideoPublic_GetVariables>): Apollo.UseSuspenseQueryResult<VideoPublic_Get, VideoPublic_GetVariables>;
export function useVideoPublic_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPublic_Get, VideoPublic_GetVariables>): Apollo.UseSuspenseQueryResult<VideoPublic_Get | undefined, VideoPublic_GetVariables>;
export function useVideoPublic_GetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPublic_Get, VideoPublic_GetVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoPublic_Get, VideoPublic_GetVariables>(VideoPublic_GetDocument, options);
        }
export type VideoPublic_GetHookResult = ReturnType<typeof useVideoPublic_Get>;
export type VideoPublic_GetLazyQueryHookResult = ReturnType<typeof useVideoPublic_GetLazyQuery>;
export type VideoPublic_GetSuspenseQueryHookResult = ReturnType<typeof useVideoPublic_GetSuspenseQuery>;
export type VideoPublic_GetQueryResult = Apollo.QueryResult<VideoPublic_Get, VideoPublic_GetVariables>;
export const VideoPublic_GetVideosDocument = gql`
    query VideoPublic_getVideos {
  video_public_get_videos {
    id
    name
    year
    languageCode
    note
    covers
    coverBackgroundColor
    originalContent
    processedContent
    contentType
    fileName
    fileS3Key
    fileUrl
    freeToUse
  }
}
    `;

/**
 * __useVideoPublic_GetVideos__
 *
 * To run a query within a React component, call `useVideoPublic_GetVideos` and pass it any options that fit your needs.
 * When your component renders, `useVideoPublic_GetVideos` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoPublic_GetVideos({
 *   variables: {
 *   },
 * });
 */
export function useVideoPublic_GetVideos(baseOptions?: Apollo.QueryHookOptions<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>(VideoPublic_GetVideosDocument, options);
      }
export function useVideoPublic_GetVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>(VideoPublic_GetVideosDocument, options);
        }
// @ts-ignore
export function useVideoPublic_GetVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>): Apollo.UseSuspenseQueryResult<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>;
export function useVideoPublic_GetVideosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>): Apollo.UseSuspenseQueryResult<VideoPublic_GetVideos | undefined, VideoPublic_GetVideosVariables>;
export function useVideoPublic_GetVideosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>(VideoPublic_GetVideosDocument, options);
        }
export type VideoPublic_GetVideosHookResult = ReturnType<typeof useVideoPublic_GetVideos>;
export type VideoPublic_GetVideosLazyQueryHookResult = ReturnType<typeof useVideoPublic_GetVideosLazyQuery>;
export type VideoPublic_GetVideosSuspenseQueryHookResult = ReturnType<typeof useVideoPublic_GetVideosSuspenseQuery>;
export type VideoPublic_GetVideosQueryResult = Apollo.QueryResult<VideoPublic_GetVideos, VideoPublic_GetVideosVariables>;