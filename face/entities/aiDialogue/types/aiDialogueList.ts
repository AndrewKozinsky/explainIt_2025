import type { AiDialogueListItemOutModel, AiDialoguesPageOutModel } from '@/shared/api/generated/models'

export type AiDialogueListItemModel = AiDialogueListItemOutModel
export type AiDialoguesPageModel = AiDialoguesPageOutModel
export type GetUserDialoguesParams = { page: number; pageSize: number }
