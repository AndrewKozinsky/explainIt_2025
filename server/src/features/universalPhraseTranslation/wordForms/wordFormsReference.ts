import type { WordFormsKind } from './wordFormsKind'

/** Ключ поиска и формы для карточки. Форма может содержать пробелы, варианты разделяются «/». */
export type WordFormsEntry = [lemma: string, firstForm: string, ...derivedForms: string[]]

export type WordFormsReference = Partial<Record<WordFormsKind, WordFormsEntry[]>>
