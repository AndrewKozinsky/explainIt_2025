import { spawn } from 'child_process'

/**
 * Run a child process to completion and reject with stderr content if it exits non-zero.
 */
function runProcess(cmd: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] })

		let stdout = ''
		let stderr = ''

		child.stdout.on('data', (chunk) => (stdout += chunk.toString()))
		child.stderr.on('data', (chunk) => (stderr += chunk.toString()))
		child.on('error', reject)
		child.on('close', (code) => {
			if (code === 0) {
				resolve({ stdout, stderr })
			} else {
				reject(new Error(`${cmd} exited with code ${code}: ${stderr.slice(-500) || stdout.slice(-500)}`))
			}
		})
	})
}

/**
 * Probe video/audio duration in seconds using ffprobe.
 */
export async function probeDurationSec(filePath: string): Promise<number> {
	const { stdout } = await runProcess('ffprobe', [
		'-v',
		'error',
		'-show_entries',
		'format=duration',
		'-of',
		'default=noprint_wrappers=1:nokey=1',
		filePath,
	])

	const seconds = parseFloat(stdout.trim())

	if (!Number.isFinite(seconds) || seconds <= 0) {
		throw new Error(`ffprobe returned invalid duration for ${filePath}: "${stdout.trim()}"`)
	}

	return seconds
}

/**
 * Extract a mono 16 kHz PCM WAV track suitable for Deepgram Nova-3 ASR.
 */
export async function extractMonoWav16k(inputPath: string, outputWavPath: string): Promise<void> {
	await runProcess('ffmpeg', [
		'-y',
		'-hide_banner',
		'-loglevel',
		'error',
		'-i',
		inputPath,
		'-vn',
		'-ac',
		'1',
		'-ar',
		'16000',
		'-f',
		'wav',
		outputWavPath,
	])
}
