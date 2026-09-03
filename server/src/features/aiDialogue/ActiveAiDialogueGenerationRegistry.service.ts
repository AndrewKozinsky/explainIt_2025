import { Injectable } from '@nestjs/common'

// In-memory registry, обеспечивающий лимит «1 активная генерация на диалог».
// Хранит AbortController, связанный с dialogueId: он позволяет оборвать стрим,
// если клиент отсоединился или процесс был отменён.
@Injectable()
export class ActiveAiDialogueGenerationRegistry {
	private byDialogueId = new Map<number, AbortController>()

	hasActiveForDialogue(dialogueId: number): boolean {
		return this.byDialogueId.has(dialogueId)
	}

	register(dialogueId: number): AbortController {
		const abortController = new AbortController()
		this.byDialogueId.set(dialogueId, abortController)
		return abortController
	}

	unregister(dialogueId: number) {
		this.byDialogueId.delete(dialogueId)
	}
}
