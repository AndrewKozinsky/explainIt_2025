import { ChildProcess } from 'child_process'
import { Readable } from 'stream'
import { Logger } from '@nestjs/common'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

// youtube-dl-exec has ESM/CJS interop issues with webpack — use require to bypass
// eslint-disable-next-line @typescript-eslint/no-require-imports
const youtubedl: typeof import('youtube-dl-exec').default = require('youtube-dl-exec')

const LOGGER_CONTEXT = 'YoutubeService'

/**
 * Скачать аудиодорожку YouTube-видео в виде читаемого потока.
 * Использует yt-dlp (через youtube-dl-exec) для получения лучшего аудиоформата
 * и отдаёт stdout как Readable.
 *
 * @param videoId — идентификатор видео на YouTube (например, "dQw4w9WgXcQ")
 * @returns поток с аудиоданными в лучшем доступном формате
 */
export function downloadAudio(videoId: string): Promise<Readable> {
	return new Promise((resolve, reject) => {
		const url = `https://www.youtube.com/watch?v=${videoId}`

		const child = youtubedl.exec(
			url,
			{
				format: 'bestaudio',
				noPlaylist: true,
				noPart: true,
				noMtime: true,
				output: '-',
				// The default web_safari/android_vr clients currently get HTTP 403 from
				// datacenter IPs (YouTube SABR + PO-token experiment, yt-dlp #12482).
				// The `web_embedded` client avoids it; `node` enables yt-dlp's JS
				// challenge solver (node is present in the worker image).
				jsRuntimes: 'node',
				extractorArgs: 'youtube:player_client=web_embedded',
			} as Parameters<typeof youtubedl.exec>[1],
			{ stdio: ['ignore', 'pipe', 'pipe'] },
		)

		// TinyspawnPromise extends both Promise and ChildProcess, but TypeScript
		// intersection makes stdout type `never`. Cast to ChildProcess to access
		// the Readable stream (available until the process exits).
		const stdout = (child as unknown as ChildProcess).stdout as Readable

		child.on('error', (err) => {
			Logger.error(`yt-dlp failed to start for video ${videoId}: ${err.message}`, err.stack, LOGGER_CONTEXT)
			reject(new CustomError(errorMessage.youtube.audioDownloadFailed, ErrorStatusCode.InternalServerError_500))
		})

		child.on('spawn', () => {
			resolve(stdout)
		})

		// Если yt-dlp упал до начала передачи данных — уничтожаем поток с ошибкой.
		// Если данные уже пошли, потребитель увидит преждевременный конец.
		let dataStarted = false

		stdout.once('data', () => {
			dataStarted = true
		})

		child.on('close', (code) => {
			if (code !== 0 && !dataStarted) {
				Logger.error(`yt-dlp exited with code ${code} for video ${videoId}`, undefined, LOGGER_CONTEXT)
				stdout.destroy(
					new CustomError(errorMessage.youtube.audioDownloadFailed, ErrorStatusCode.InternalServerError_500),
				)
			}
		})

		// stderr yt-dlp — информационные сообщения и прогресс
		const stderr = (child as unknown as ChildProcess).stderr as Readable
		stderr.on('data', (chunk: Buffer) => {
			Logger.debug(`yt-dlp [${videoId}]: ${chunk.toString().trim()}`, LOGGER_CONTEXT)
		})
	})
}
