import type { AvatarPresetId, UserGender } from '@/entities/user/UserService'

export type ProfileFormState = {
	status: 'idle' | 'saving' | 'saved' | 'error'
	pendingGender?: UserGender
	pendingPresetId?: AvatarPresetId
	error?: string
}
export type ProfileFormEvent =
	| {
			type: 'start'
			pendingGender?: UserGender
			pendingPresetId?: AvatarPresetId
	  }
	| { type: 'success' }
	| { type: 'failure'; error: string }

/** Переходы формы: idle/saved/error → saving → saved/error. */
export function profileFormReducer(state: ProfileFormState, event: ProfileFormEvent): ProfileFormState {
	if (event.type === 'start') {
		if (state.status === 'saving') return state

		return {
			status: 'saving',
			pendingGender: event.pendingGender,
			pendingPresetId: event.pendingPresetId,
		}
	}

	if (state.status !== 'saving') return state
	if (event.type === 'success') return { status: 'saved' }

	return { status: 'error', error: event.error }
}

/** Текст ошибки с сервера, если он есть; иначе null — тогда выводится перевод статуса (mePage.profile.status) */
export function getProfileErrorText(state: ProfileFormState): string | null {
	return state.status === 'error' && state.error ? state.error : null
}
