
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

export interface IQuery {
    ai_checkTranslation(input: CheckTranslationInput): CheckTranslationOutModel | Promise<CheckTranslationOutModel>;
}

export interface SuccessResult {
    correct: boolean;
    analysis: string;
}

export interface ErrorResult {
    error: string;
}

export type CheckTranslationOutModel = SuccessResult | ErrorResult;
type Nullable<T> = T | null;
