// Records the dialogue demo: drives the real site, captures frames via CDP screencast,
// logs caption changes and wait intervals (cuts) into timeline.json for the editing step.
// Usage: node record.mjs <take-dir> <locale-config.json>
import { chromium } from './pw.mjs'
import fs from 'fs'
import path from 'path'

const takeDir = process.argv[2]
const localeConfig = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'))
const framesDir = path.join(takeDir, 'frames')
fs.mkdirSync(framesDir, { recursive: true })

const origin = 'http://localhost'
const viewport = { width: 1280, height: 720 }
const ui = localeConfig.ui
const captions = localeConfig.captions

const timeline = { frames: [], cuts: [], captions: [], notes: [] }
const nowSeconds = () => Date.now() / 1000
const pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const saveTimeline = () => fs.writeFileSync(path.join(takeDir, 'timeline.json'), JSON.stringify(timeline, null, 1))

let openCutStart = null
function startCut() {
	if (openCutStart === null) openCutStart = nowSeconds()
}
function endCut() {
	if (openCutStart === null) return
	timeline.cuts.push([openCutStart, nowSeconds()])
	openCutStart = null
}
function showCaption(key) {
	timeline.captions.push({ at: nowSeconds(), text: key ? captions[key] : '' })
}
function note(text) {
	timeline.notes.push(text)
	console.log('NOTE', text)
}

// Visual helpers injected into every document: fake cursor, click ripple, hidden dev overlay and scrollbars
const pageHelpers = () => {
	const install = () => {
		if (document.getElementById('demo-cursor')) return
		const style = document.createElement('style')
		style.textContent = `
			nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }
			html { scrollbar-width: none; } html::-webkit-scrollbar { display: none; }
			#demo-cursor { position: fixed; left: 0; top: 0; width: 26px; height: 26px; z-index: 2147483647; pointer-events: none;
				transition: transform 0.65s cubic-bezier(.4,.0,.2,1); transform: translate(640px, 500px); }
			.demo-ripple { position: fixed; width: 36px; height: 36px; margin: -18px 0 0 -18px; border-radius: 50%; z-index: 2147483646;
				pointer-events: none; background: rgba(255, 90, 31, .35); animation: demo-ripple .5s ease-out forwards; }
			@keyframes demo-ripple { from { transform: scale(.3); opacity: 1 } to { transform: scale(1.6); opacity: 0 } }`
		document.head.appendChild(style)
		const cursor = document.createElement('div')
		cursor.id = 'demo-cursor'
		cursor.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2 L4 19 L8.5 15 L11.5 22 L14.5 20.7 L11.5 14 L18 14 Z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`
		document.body.appendChild(cursor)
		const saved = sessionStorage.getItem('demo-cursor')
		if (saved) {
			cursor.style.transition = 'none'
			cursor.style.transform = saved
			requestAnimationFrame(() => (cursor.style.transition = ''))
		}
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install)
	else install()
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
	storageState: path.join(path.dirname(new URL(import.meta.url).pathname), 'state.json'),
	viewport,
	deviceScaleFactor: 2,
	locale: localeConfig.locale,
})
await context.addInitScript(pageHelpers)
const page = await context.newPage()

// Frame capture
const cdp = await context.newCDPSession(page)
let frameIndex = 0
cdp.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
	const fileName = `${String(frameIndex++).padStart(6, '0')}.jpg`
	fs.writeFileSync(path.join(framesDir, fileName), Buffer.from(data, 'base64'))
	timeline.frames.push([fileName, metadata.timestamp])
	await cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
})
const startCapture = () =>
	cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 2560, maxHeight: 1440, everyNthFrame: 1 })

// Interaction helpers
async function moveCursorTo(x, y) {
	await page.evaluate(
		([pointX, pointY]) => {
			const cursor = document.getElementById('demo-cursor')
			const transform = `translate(${pointX - 4}px, ${pointY - 2}px)`
			cursor.style.transform = transform
			sessionStorage.setItem('demo-cursor', transform)
		},
		[x, y],
	)
	await pause(700)
}
async function clickOn(locator, { pauseAfter = 500 } = {}) {
	await locator.scrollIntoViewIfNeeded()
	const box = await locator.boundingBox()
	const x = box.x + box.width / 2
	const y = box.y + box.height / 2
	await moveCursorTo(x, y)
	await page.evaluate(([pointX, pointY]) => {
		const ripple = document.createElement('div')
		ripple.className = 'demo-ripple'
		ripple.style.left = pointX + 'px'
		ripple.style.top = pointY + 'px'
		document.body.appendChild(ripple)
		setTimeout(() => ripple.remove(), 600)
	}, [x, y])
	await page.mouse.click(x, y)
	await pause(pauseAfter)
}
/** Smoothly scrolls the window so that the element's top lands at `offsetFromTop` px (or its bottom at the viewport bottom). */
async function scrollToElement(locator, { offsetFromTop = 90, alignBottom = false, duration = 900 } = {}) {
	const target = await locator.evaluate(
		(element, [offset, bottom]) => {
			const rect = element.getBoundingClientRect()
			const wanted = bottom ? window.scrollY + rect.bottom - window.innerHeight + 24 : window.scrollY + rect.top - offset
			return Math.max(0, Math.min(wanted, document.documentElement.scrollHeight - window.innerHeight))
		},
		[offsetFromTop, alignBottom],
	)
	await page.evaluate(
		([targetY, milliseconds]) =>
			new Promise((resolve) => {
				const startY = window.scrollY
				const startTime = performance.now()
				const step = (time) => {
					const progress = Math.min(1, (time - startTime) / milliseconds)
					const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
					window.scrollTo(0, startY + (targetY - startY) * eased)
					progress < 1 ? requestAnimationFrame(step) : resolve()
				}
				requestAnimationFrame(step)
			}),
		[target, duration],
	)
	await pause(200)
}
async function typeInto(text) {
	await page.keyboard.type(text, { delay: 38 })
}
async function selectTextInEditor(fragment) {
	await page.locator('textarea.ai-dialogue-input__editor').evaluate((editor, part) => {
		const start = editor.value.indexOf(part)
		editor.focus()
		editor.setSelectionRange(start, start + part.length)
	}, fragment)
}

/** All images in the dialogue column are loaded, the latest NPC reply is done and the form is editable again. */
async function waitForDialogueReady(minimumNpcMessages) {
	await page.waitForFunction(
		(count) => {
			const npcMessages = document.querySelectorAll('.nps-message')
			if (npcMessages.length < count) return false
			const images = [...document.querySelectorAll('.ai-dialogue-left-wrapper img')]
			if (!images.length || images.some((image) => !image.complete || !image.naturalWidth)) return false
			const sceneImages = document.querySelectorAll('.ai-dialogue-message-scene-update__image img')
			if (sceneImages.length < document.querySelectorAll('.ai-dialogue-message-scene-update').length) return false
			const avatars = document.querySelectorAll('.nps-message .dialogue-npc-avatar img')
			if (avatars.length < npcMessages.length) return false
			const editor = document.querySelector('textarea.ai-dialogue-input__editor')
			return editor && !editor.disabled && !editor.readOnly
		},
		minimumNpcMessages,
		{ timeout: 240_000, polling: 500 },
	)
	await pause(1200)
}

async function readCheckResult() {
	return page.evaluate(() => ({
		failed: !!document.querySelector('.ai-dialogue-input__request-error'),
		critical: [...document.querySelectorAll('.ai-dialogue-input__issue .ai-dialogue-input__error-sentence')].map((node) => node.textContent),
		suggestions: document.querySelectorAll('.ai-dialogue-input__suggestion').length,
	}))
}
/**
 * Clicks "Check" and, inside a cut, repeats the check until `isIdeal(result)` is true.
 * After `idealAttempts` tries it settles for `isAcceptable(result)` (defaults to the ideal rule).
 */
async function checkUntil(isIdeal, label, { isAcceptable = isIdeal, idealAttempts = 5 } = {}) {
	const checkButton = page.getByRole('button', { name: ui.check, exact: true })
	await clickOn(checkButton, { pauseAfter: 350 })
	startCut()
	for (let attempt = 1; attempt <= 12; attempt++) {
		await page.waitForFunction(
			() => !document.querySelector('textarea.ai-dialogue-input__editor')?.readOnly,
			null,
			{ timeout: 90_000 },
		)
		await pause(300)
		const result = await readCheckResult()
		console.log(label, 'attempt', attempt, JSON.stringify(result))
		const accept = attempt <= idealAttempts ? isIdeal : isAcceptable
		if (!result.failed && accept(result)) {
			endCut()
			return result
		}
		// Make the text a new version (trailing space toggle) and check again
		const editor = page.locator('textarea.ai-dialogue-input__editor')
		await editor.focus()
		await editor.press('End')
		const hasTrailingSpace = await editor.evaluate((element) => element.value.endsWith(' '))
		await page.keyboard.press(hasTrailingSpace ? 'Backspace' : 'Space')
		await page.getByRole('button', { name: ui.check, exact: true }).click()
	}
	throw new Error(`Check "${label}" never gave the wanted result`)
}

try {
	// 1. Scenario list → start window
	await page.goto(`${origin}/${localeConfig.locale}/dialogues`)
	await page.getByText(ui.scenarioTitle).first().waitFor()
	// Scroll through the list once so lazy cover images are loaded before capture starts
	for (let y = 0; y < 6000; y += 500) {
		await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
		await pause(250)
	}
	await page.waitForFunction(() => [...document.images].every((image) => image.complete), null, { timeout: 30_000 }).catch(() => {})
	await pause(1500)
	const card =page.getByText(ui.scenarioTitle, { exact: true }).last()
	await scrollToElement(page.getByRole('heading', { name: ui.scenarioGroup }).first(), { offsetFromTop: 40, duration: 10 })
	await pause(300)
	await startCapture()
	showCaption('choose')
	await pause(1600)
	await scrollToElement(card, { offsetFromTop: 260, duration: 900 })
	await clickOn(card, { pauseAfter: 2600 })

	const modal = page.locator('.start-dialogue-modal__content')
	showCaption('settings')
	await modal.locator('.language-switch__button').first().evaluate((element) => element.scrollIntoView({ behavior: 'smooth', block: 'start' }))
	await pause(1300)
	await clickOn(modal.locator('.language-switch__button', { hasText: localeConfig.practiceLanguage }), { pauseAfter: 600 })
	await clickOn(modal.getByRole('button', { name: localeConfig.level, exact: true }), { pauseAfter: 600 })
	await clickOn(modal.locator('label', { hasText: ui.illustrationStyle }), { pauseAfter: 700 })
	await clickOn(modal.getByRole('button', { name: new RegExp(ui.start) }), { pauseAfter: 300 })

	// 2. Wait for the opening scene (cut)
	startCut()
	await page.waitForURL(/dialogues\/\d+/, { timeout: 60_000 })
	await waitForDialogueReady(1)
	await page.evaluate(() => window.scrollTo(0, 0))
	await pause(400)
	endCut()
	timeline.dialogueUrl = page.url()
	saveTimeline()

	showCaption('scene')
	await pause(1500)
	await scrollToElement(page.locator('.ai-dialogue-message-scene-update').first(), { offsetFromTop: 30, duration: 1000 })
	await pause(3000)

	// 3. NPC speaks and acts
	const firstNpcMessage = page.locator('.nps-message').first()
	await scrollToElement(firstNpcMessage, { alignBottom: true, duration: 900 })
	showCaption('npc')
	await moveCursorTo(...(await firstNpcMessage.boundingBox().then((box) => [box.x + 300, box.y + box.height - 15])))
	await pause(3200)

	// 4. Unknown word → translation + dictionary article
	const sceneBlock = page.locator('.ai-dialogue-message-scene-update').first()
	let wordButton = null
	for (const word of localeConfig.dictionaryWords) {
		const candidate = page.locator('.ai-dialogue-left-wrapper button', { hasText: new RegExp(`^${word}$`, 'i') }).first()
		if (await candidate.count()) {
			wordButton = candidate
			note(`dictionary word: ${word}`)
			break
		}
	}
	if (wordButton) {
		await scrollToElement(sceneBlock, { offsetFromTop: -120, duration: 800 })
		showCaption('word')
		await pause(1200)
		await clickOn(wordButton, { pauseAfter: 300 })
		startCut()
		await page.waitForFunction(
			(loadingText) => {
				const panelImages = [...document.querySelectorAll('img')].filter((image) => image.getBoundingClientRect().left > 760)
				const loading = document.body.innerText.includes(loadingText)
				return !loading && panelImages.length > 0 && panelImages.every((image) => image.complete && image.naturalWidth)
			},
			ui.translationLoading,
			{ timeout: 60_000, polling: 400 },
		).catch(() => note('dictionary article has no images'))
		await pause(2500)
		endCut()
		await pause(1500)
		showCaption('dictionary')
		await pause(4500)
	} else {
		note('no preloaded dictionary word found in text')
	}

	// 5. User answers with mistakes
	const editor = page.locator('textarea.ai-dialogue-input__editor')
	await scrollToElement(page.locator('.ai-dialogue-input'), { alignBottom: true, duration: 900 })
	showCaption('answer')
	await clickOn(editor, { pauseAfter: 300 })
	await typeInto(localeConfig.flawedSpeech)
	await pause(700)
	const containsExpectedError = (result) => result.critical.some((sentence) => sentence.includes(localeConfig.expectedError))
	const firstCheck = await checkUntil(
		(result) => result.critical.length === 1 && containsExpectedError(result),
		'flawed',
		{ isAcceptable: (result) => containsExpectedError(result) && result.critical.every((sentence) => localeConfig.fixes.some((fix) => sentence.includes(fix.from.slice(0, 12)))) },
	)
	await scrollToElement(page.locator('.ai-dialogue-input'), { alignBottom: true, duration: 700 })
	showCaption('errors')
	await moveCursorTo(...(await page.locator('.ai-dialogue-input__issue').first().boundingBox().then((box) => [box.x + 220, box.y + 40])))
	await pause(5500)

	// 6. Fix and check again → style suggestion
	showCaption('fix')
	const editorBox = await editor.boundingBox()
	await moveCursorTo(editorBox.x + editorBox.width - 120, editorBox.y + editorBox.height / 2)
	const fixesToApply = localeConfig.fixes.filter((fix) => firstCheck.critical.some((sentence) => sentence.includes(fix.from.slice(0, 12))))
	note(`fixes: ${fixesToApply.map((fix) => fix.from).join(' | ')}`)
	for (const fix of fixesToApply) {
		await selectTextInEditor(fix.from)
		await pause(900)
		await typeInto(fix.to)
		await pause(600)
	}
	await checkUntil((result) => result.critical.length === 0 && result.suggestions > 0, 'fixed', {
		isAcceptable: (result) => result.critical.length === 0,
	})
	await scrollToElement(page.locator('.ai-dialogue-input'), { alignBottom: true, duration: 700 })
	const hasSuggestion = (await page.locator('.ai-dialogue-input__suggestion').count()) > 0
	if (!hasSuggestion) note('no style suggestion after the fix')
	showCaption(hasSuggestion ? 'suggestion' : 'ready')
	if (hasSuggestion) await moveCursorTo(...(await page.locator('.ai-dialogue-input__suggestion').first().boundingBox().then((box) => [box.x + 260, box.y + 30])))
	await pause(5000)

	// 7. Send → NPC replies
	showCaption('send')
	await clickOn(page.getByRole('button', { name: ui.send, exact: true }), { pauseAfter: 900 })
	startCut()
	await waitForDialogueReady(2)
	await scrollToElement(page.locator('.nps-message').last(), { alignBottom: true, duration: 10 })
	endCut()
	showCaption('reply')
	await pause(4000)

	// 8. Action + speech → world reacts, face changes
	showCaption('action')
	await scrollToElement(page.locator('.ai-dialogue-input'), { alignBottom: true, duration: 700 })
	await clickOn(page.getByRole('button', { name: ui.actionTab, exact: true }), { pauseAfter: 400 })
	await clickOn(editor, { pauseAfter: 200 })
	await typeInto(localeConfig.action)
	await pause(500)
	await checkUntil((result) => result.critical.length === 0, 'action')
	await pause(900)
	await clickOn(page.getByRole('button', { name: ui.speechTab, exact: true }), { pauseAfter: 400 })
	await clickOn(editor, { pauseAfter: 200 })
	await typeInto(localeConfig.secondSpeech)
	await pause(500)
	await checkUntil((result) => result.critical.length === 0, 'second speech')
	await pause(1000)
	await clickOn(page.getByRole('button', { name: ui.send, exact: true }), { pauseAfter: 900 })
	startCut()
	await waitForDialogueReady(3)
	const npcMessages = page.locator('.nps-message')
	await scrollToElement(npcMessages.nth(1), { offsetFromTop: 60, duration: 10 })
	endCut()
	showCaption('reaction')
	await pause(1500)
	await scrollToElement(npcMessages.last(), { alignBottom: true, duration: 1200 })
	const lastAvatar = await npcMessages.last().locator('.dialogue-npc-avatar').boundingBox()
	await moveCursorTo(lastAvatar.x + lastAvatar.width + 8, lastAvatar.y + lastAvatar.height / 2)
	await pause(5500)

	showCaption('final')
	await pause(3500)
	await cdp.send('Page.stopScreencast')
	timeline.endedAt = nowSeconds()
	console.log('DONE', timeline.dialogueUrl)
} catch (error) {
	note(`FAILED: ${error.message}`)
	await page.screenshot({ path: path.join(takeDir, 'failure.png') }).catch(() => {})
	process.exitCode = 1
} finally {
	saveTimeline()
	await browser.close()
}
