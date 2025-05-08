
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

export interface IQuery {
    ai_checkTranslation(input: CheckTranslationInput): CheckTranslationOutModel | Promise<CheckTranslationOutModel>;
    ai_getTranscription(input: GetTranscriptionInput): GetTranscriptionOutModel | Promise<GetTranscriptionOutModel>;
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

export type CheckTranslationOutModel = CheckTranslationOutSuccessModel | CheckTranslationOutErrorModel;
export type GetTranscriptionOutModel = GetTranscriptionOutSuccessModel | GetTranscriptionOutErrorModel;
type Nullable<T> = T | null;
