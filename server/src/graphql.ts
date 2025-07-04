
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

export interface ConfirmEmailInput {
    code: string;
}

export interface RegisterUserInput {
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface ResendConfirmationEmailInput {
    email: string;
}

export interface UserOutModel {
    id: number;
    email: string;
}

export interface IQuery {
    ai_checkTranslation(input: CheckTranslationInput): CheckTranslationOutModel | Promise<CheckTranslationOutModel>;
    ai_getTranscription(input: GetTranscriptionInput): GetTranscriptionOutModel | Promise<GetTranscriptionOutModel>;
    auth_confirmEmail(input: ConfirmEmailInput): boolean | Promise<boolean>;
    auth_getMe(): UserOutModel | Promise<UserOutModel>;
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
    auth_resendConfirmationEmail(input: ResendConfirmationEmailInput): boolean | Promise<boolean>;
    auth_logout(): boolean | Promise<boolean>;
}

export type CheckTranslationOutModel = CheckTranslationOutSuccessModel | CheckTranslationOutErrorModel;
export type GetTranscriptionOutModel = GetTranscriptionOutSuccessModel | GetTranscriptionOutErrorModel;
type Nullable<T> = T | null;
