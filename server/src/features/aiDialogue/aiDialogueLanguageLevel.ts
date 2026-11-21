import { ProficiencyLevel } from 'utils/proficiencyLevel'

/** Сложность практики или начальная сложность экзамена. null — речь без ограничений в практике. */
export const AI_DIALOGUE_CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const satisfies readonly ProficiencyLevel[]
export type AiDialogueCefrLevel = (typeof AI_DIALOGUE_CEFR_LEVELS)[number]

export const AI_DIALOGUE_MODES = ['practice', 'exam'] as const
export type AiDialogueMode = (typeof AI_DIALOGUE_MODES)[number]

/** A0 — внутренний результат: в этой попытке A1 не подтверждён. */
export type AiDialogueExamLevel = 'A0' | AiDialogueCefrLevel
export type AiDialogueScenarioMedals = Record<AiDialogueCefrLevel, string>
