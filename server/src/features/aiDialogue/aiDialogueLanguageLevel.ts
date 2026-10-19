import { ProficiencyLevel } from 'utils/proficiencyLevel'

/** Верхние границы сложности текста диалогов. null в настройке диалога отключает адаптацию. */
export const AI_DIALOGUE_CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2'] as const satisfies readonly ProficiencyLevel[]
export type AiDialogueCefrLevel = (typeof AI_DIALOGUE_CEFR_LEVELS)[number]
