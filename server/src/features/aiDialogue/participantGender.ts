import type { UserGender } from 'prisma/generated/client'

/** Пол участника диалога в виде английского описания для промптов LLM. */
export function describeParticipantGender(gender: UserGender): string {
	return gender === 'FEMALE' ? 'a woman' : 'a man'
}
