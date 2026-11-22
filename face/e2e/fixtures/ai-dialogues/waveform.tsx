import { useState, useSyncExternalStore } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '@/messages/ru/aiDialogueForm.json'
import { AiDialogueDraftFooter } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/AiDialogueDraftControls'
import { AiDialogueDraftController } from '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/fn/AiDialogueDraftController'
import '@/widgets/aiDialogue/aiDialogueForm/AiDialogueForm/AiDialogueInput.scss'

/** Recording UI under the application's real CSS reset, without microphone or network access. */
export default function WaveformFixture() {
	const [controller] = useState(
		() =>
			new AiDialogueDraftController({
				openDictation: (callbacks) => {
					callbacks.onPhase('recording')
					return { stop: () => callbacks.onDone(''), cancel() {} }
				},
				send: async () => null,
			}),
	)

	const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)

	return (
		<NextIntlClientProvider locale='ru' messages={{ aiDialogueForm: messages }} timeZone='Asia/Yekaterinburg'>
			<main
				style={{
					maxWidth: 700,
					margin: '40px auto',
					padding: 16,
					border: '1px solid #e4e3e1',
					borderRadius: 12,
				}}
			>
				<section className='ai-dialogue-input'>
					<p style={{ fontSize: 24, lineHeight: '32px' }}>Проверка индикатора записи</p>
					<AiDialogueDraftFooter
						state={state}
						controller={controller}
						blocked={false}
						preserveFocus={() => undefined}
					/>
				</section>
			</main>
		</NextIntlClientProvider>
	)
}
