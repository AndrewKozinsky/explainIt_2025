import { Injectable } from '@nestjs/common'

// In-memory registry, обеспечивающий лимит «1 активная генерация на диалог».
// Фоновая генерация продолжается независимо от подключения клиента.
@Injectable()
export class ActiveAiDialogueGenerationRegistry {
	private byDialogueId = new Set<number>()

	hasActiveForDialogue(dialogueId: number): boolean {
		return this.byDialogueId.has(dialogueId)
	}

	register(dialogueId: number): void {
		this.byDialogueId.add(dialogueId)
	}

	unregister(dialogueId: number) {
		this.byDialogueId.delete(dialogueId)
	}
}
