import { ChildProcess } from 'child_process'
import { PassThrough, Readable } from 'stream'
import { Logger } from '@nestjs/common'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
// youtube-dl-exec has ESM/CJS interop issues with webpack — use require to bypass
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

		// Tinyspawn is both a child process and a rejecting Promise. Event listeners alone
		// do not handle that Promise: an unavailable video used to crash the entire worker.
		const process = child as unknown as ChildProcess
		const stdout = process.stdout as Readable
		const output = new PassThrough()
		let completed = false
		let failed = false

		// A spawn failure may precede the consumer attaching pipeline(). The stored
		// stream error still reaches that consumer, without an unhandled error event.
		output.on('error', () => undefined)

		const fail = () => {
			if (failed) return

			failed = true
			Logger.error(`yt-dlp audio download failed for video ${videoId}`, undefined, LOGGER_CONTEXT)
			const error = new CustomError(
				errorMessage.youtube.audioDownloadFailed,
				ErrorStatusCode.InternalServerError_500,
			)

			stdout.unpipe(output)
			output.destroy(error)
			reject(error)
		}

		stdout.on('error', fail)
		// stdout can end before the process reports a non-zero exit. Keep the public
		// stream open until successful process completion, including partial downloads.
		stdout.pipe(output, { end: false })
		child.once('error', fail)
		child.once('spawn', () => resolve(output))

		void child.then(() => {
			completed = true
			if (!failed) output.end()
		}, fail)

		output.once('close', () => {
			if (!completed) child.kill('SIGTERM')
		})

		const stderr = process.stderr as Readable
		stderr.on('data', (chunk: Buffer) => {
			Logger.debug(`yt-dlp [${videoId}]: ${chunk.toString().trim()}`, LOGGER_CONTEXT)
		})
	})
}
