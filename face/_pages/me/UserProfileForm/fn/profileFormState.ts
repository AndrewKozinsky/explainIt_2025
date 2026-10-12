import type { AvatarPresetId, UserGender } from '@/entities/user/UserService'

export type ProfileOperation = 'gender' | 'preset' | 'photo' | 'upload'
export type ProfileFormState = {
	status: 'idle' | 'saving' | 'saved' | 'error'
	operation?: ProfileOperation
	pendingGender?: UserGender
	pendingPresetId?: AvatarPresetId | null
	error?: string
}
export type ProfileFormEvent =
	| {
			type: 'start'
			operation: ProfileOperation
			pendingGender?: UserGender
			pendingPresetId?: AvatarPresetId | null
	  }
	| { type: 'success' }
	| { type: 'failure'; error: string }

/** Переходы формы: idle/saved/error → saving → saved/error. */
export function profileFormReducer(state: ProfileFormState, event: ProfileFormEvent): ProfileFormState {
	if (event.type === 'start') {
		if (state.status === 'saving') return state

		return {
			status: 'saving',
			operation: event.operation,
			pendingGender: event.pendingGender,
			pendingPresetId: event.pendingPresetId,
		}
	}

	if (state.status !== 'saving') return state
	if (event.type === 'success') return { status: 'saved' }

	return { status: 'error', error: event.error }
}

export function getProfileStatusText(state: ProfileFormState): string {
	if (state.status === 'saving') return 'Сохраняем изменения…'
	if (state.status === 'error') return state.error ?? 'Не удалось сохранить изменения'
	if (state.status === 'saved') return 'Изменения сохранены'

	return 'Изменения сохраняются автоматически'
}
