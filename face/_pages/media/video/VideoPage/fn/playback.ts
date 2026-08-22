import type { PlayerCommand } from '@/entities/videoPlayer'
import type { VideoSubtitlesModel } from '@/entities/video/lib/types'
import { useVideoStore } from '../../videoStore'
import { findActiveSubtitleIndex, findNextSubtitleIndex, findPrevSubtitleIndex } from './subtitles'

type Subtitle = VideoSubtitlesModel.Subtitle

// ── Runtime (модульное состояние, не в сторе) ─────────────────────────

let shadowTimer: null | ReturnType<typeof setTimeout> = null
let shadowIndex = -1
let revertToSeconds: null | number = null

// ── Хелперы ───────────────────────────────────────────────────────────

function getStore() {
	return useVideoStore.getState()
}

function send(command: PlayerCommand) {
	getStore().sendPlayerCommand(command)
}

function getSubtitles(): null | Subtitle[] {
	return getStore().subtitles
}

function getCurrentTime(): number {
	return getStore().player.currentTime
}

function isPlaying(): boolean {
	return !getStore().player.paused
}

function setMode(mode: 'video' | 'shadowing' | 'subAndRevert' | 'sub') {
	getStore().setPlayback({ mode })
}

function setStopAt(stopAt: null | number) {
	getStore().setPlayback({ stopAt })
}

function clearShadowTimer() {
	if (shadowTimer == null) return
	clearTimeout(shadowTimer)
	shadowTimer = null
}

/** Отменяет авто-остановку: таймер шэдоуинга, возврат к началу и stopAt. */
function cancelAutoStop() {
	clearShadowTimer()
	shadowIndex = -1
	revertToSeconds = null
	setStopAt(null)
}

/** Активный субтитр или следующий за текущей точкой (если точка вне субтитра). */
function getTargetSubtitleIndex(subtitles: Subtitle[], t: number): number {
	const active = findActiveSubtitleIndex(subtitles, t)
	if (active !== -1) return active
	return findNextSubtitleIndex(subtitles, t)
}

// ── Авто-остановка ────────────────────────────────────────────────────

function handleShadowAutoStop() {
	const subtitles = getSubtitles()

	send({ type: 'PAUSE' })
	setStopAt(null)
	clearShadowTimer()

	const sub = subtitles?.[shadowIndex]
	if (!sub) return

	const waitMs = Math.max(0, (sub.toSeconds - sub.fromSeconds) * 1000)
	shadowTimer = setTimeout(() => {
		playNextShadowSubtitle(subtitles, sub.toSeconds)
	}, waitMs)
}

function playNextShadowSubtitle(subtitles: Subtitle[], fromSeconds: number) {
	const next = findNextSubtitleIndex(subtitles, fromSeconds)
	if (next === -1) {
		shadowIndex = -1
		return
	}

	shadowIndex = next
	send({ type: 'SET_TIME', time: subtitles[next].fromSeconds })
	setStopAt(subtitles[next].toSeconds)
	send({ type: 'PLAY' })
}

export function handleAutoStop() {
	const { mode } = getStore().playback

	if (mode === 'shadowing') {
		handleShadowAutoStop()
		return
	}

	if (mode === 'subAndRevert') {
		send({ type: 'PAUSE' })
		send({ type: 'SET_TIME', time: revertToSeconds ?? 0 })
		setStopAt(null)
		revertToSeconds = null
		return
	}

	// 'sub' (и защитно — 'video')
	send({ type: 'PAUSE' })
	setStopAt(null)
}

// ── Режимы ────────────────────────────────────────────────────────────

function startSubMode() {
	const subtitles = getSubtitles()
	const t = getCurrentTime()

	cancelAutoStop()
	setMode('sub')

	if (!subtitles || subtitles.length === 0) return

	const target = getTargetSubtitleIndex(subtitles, t)
	if (target === -1) return

	send({ type: 'SET_TIME', time: subtitles[target].fromSeconds })
	setStopAt(subtitles[target].toSeconds)
	send({ type: 'PLAY' })
}

function startSubAndRevertMode() {
	const subtitles = getSubtitles()
	const t = getCurrentTime()

	cancelAutoStop()
	setMode('subAndRevert')

	if (!subtitles || subtitles.length === 0) return

	const target = getTargetSubtitleIndex(subtitles, t)
	if (target === -1) return

	revertToSeconds = subtitles[target].fromSeconds
	setStopAt(subtitles[target].toSeconds)
	send({ type: 'PLAY' })
}

function startShadowing() {
	const subtitles = getSubtitles()
	const t = getCurrentTime()

	cancelAutoStop()
	setMode('shadowing')

	if (!subtitles || subtitles.length === 0) return

	const target = getTargetSubtitleIndex(subtitles, t)
	if (target === -1) return

	shadowIndex = target
	send({ type: 'SET_TIME', time: subtitles[target].fromSeconds })
	setStopAt(subtitles[target].toSeconds)
	send({ type: 'PLAY' })
}

function stopShadowing() {
	cancelAutoStop()
	send({ type: 'PAUSE' })
}

// ── Кнопки ────────────────────────────────────────────────────────────

/** 1. Переход к началу видео и остановка. */
export function toVideoStart() {
	cancelAutoStop()
	send({ type: 'PAUSE' })
	send({ type: 'SET_TIME', time: 0 })
}

/** 2. Запуск/остановка воспроизведения с текущего места до конца. */
export function playVideo() {
	if (getStore().playback.mode === 'video') {
		send(isPlaying() ? { type: 'PAUSE' } : { type: 'PLAY' })
		return
	}

	cancelAutoStop()
	setMode('video')
	send({ type: 'PLAY' })
}

/** 3. Шэдоуинг: текущий субтитр → пауза → следующий субтитр (циклично). */
export function playVideoShadowing() {
	if (getStore().playback.mode === 'shadowing') {
		if (isPlaying()) stopShadowing()
		else startShadowing()
		return
	}

	startShadowing()
}

/** 4. Переход к началу предыдущего субтитра и остановка. */
export function toPrevSub() {
	const subtitles = getSubtitles()
	if (!subtitles || subtitles.length === 0) return

	const target = findPrevSubtitleIndex(subtitles, getCurrentTime())
	if (target === -1) return

	cancelAutoStop()
	send({ type: 'PAUSE' })
	send({ type: 'SET_TIME', time: subtitles[target].fromSeconds })
}

/** 5. Текущий субтитр с текущего места, возврат к началу и остановка. Тумблер. */
export function playSubAndRevert() {
	if (getStore().playback.mode === 'subAndRevert') {
		if (isPlaying()) send({ type: 'PAUSE' })
		else startSubAndRevertMode()

		return
	}

	startSubAndRevertMode()
}

/** 6. Текущий субтитр и остановка перед следующим. Тумблер. */
export function playSub() {
	if (getStore().playback.mode === 'sub') {
		if (isPlaying()) send({ type: 'PAUSE' })
		else startSubMode()

		return
	}

	startSubMode()
}

/** 7. Переход к началу следующего субтитра и остановка. */
export function toNextSub() {
	const subtitles = getSubtitles()
	if (!subtitles || subtitles.length === 0) return

	const target = findNextSubtitleIndex(subtitles, getCurrentTime())
	if (target === -1) return

	cancelAutoStop()
	send({ type: 'PAUSE' })
	send({ type: 'SET_TIME', time: subtitles[target].fromSeconds })
}

/** Пробел / центр-клик: повторяет действие текущей режимной кнопки. */
export function toggleCurrentMode() {
	const { mode } = getStore().playback

	if (mode === 'video') playVideo()
	else if (mode === 'shadowing') playVideoShadowing()
	else if (mode === 'subAndRevert') playSubAndRevert()
	else playSub()
}

// ── Перемотка и удержание ─────────────────────────────────────────────

export function rewind(seconds: number) {
	cancelAutoStop()
	send({ type: 'REWIND', seconds })
}

export function startForwardHold(rate: number) {
	cancelAutoStop()
	send({ type: 'START_FORWARD_HOLD', rate })
}

export function stopForwardHold() {
	send({ type: 'STOP_FORWARD_HOLD' })
}

export function startReverseSeek(rate: number) {
	cancelAutoStop()
	send({ type: 'START_REVERSE_SEEK', rate })
}

export function stopReverseSeek() {
	send({ type: 'STOP_REVERSE_SEEK' })
}

/** Полный сброс runtime-состояния (при смене видео). */
export function resetPlaybackRuntime() {
	clearShadowTimer()
	shadowIndex = -1
	revertToSeconds = null
}
