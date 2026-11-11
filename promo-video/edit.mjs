// Builds the final video from a take: drops frames inside cuts, adds a caption band below the page.
// Usage: node edit.mjs <take-dir> <output.mp4>
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const takeDir = path.resolve(process.argv[2])
const outputFile = path.resolve(process.argv[3])
const timeline = JSON.parse(fs.readFileSync(path.join(takeDir, 'timeline.json'), 'utf8'))

const recordingStart = timeline.frames[0][1]
const recordingEnd = timeline.endedAt ?? timeline.frames.at(-1)[1] + 1
const cuts = timeline.cuts

const isInsideCut = (time) => cuts.some(([cutStart, cutEnd]) => time > cutStart && time < cutEnd)
/** Maps a wall-clock time to the edited video time (seconds from start, with cuts removed). */
function toVideoTime(time) {
	let removed = 0
	for (const [cutStart, cutEnd] of cuts) {
		if (time >= cutEnd) removed += cutEnd - cutStart
		else if (time > cutStart) removed += time - cutStart
	}
	return Math.max(0, time - recordingStart - removed)
}

// Frames → concat list with per-frame durations. The screencast sends frames only on change,
// so the last frame inside a cut is the screen state at the cut end: keep it, retimed to the cut end.
const keptFrames = timeline.frames.filter(([, time]) => !isInsideCut(time))
for (const [cutStart, cutEnd] of cuts) {
	const lastInside = timeline.frames.filter(([, time]) => time > cutStart && time < cutEnd).at(-1)
	if (lastInside) keptFrames.push([lastInside[0], cutEnd])
}
keptFrames.sort((first, second) => first[1] - second[1])
const videoEnd = toVideoTime(recordingEnd)
const concatLines = []
keptFrames.forEach(([fileName, time], index) => {
	const nextTime = index + 1 < keptFrames.length ? toVideoTime(keptFrames[index + 1][1]) : videoEnd
	const duration = Math.max(0.001, nextTime - toVideoTime(time))
	concatLines.push(`file '${path.join(takeDir, 'frames', fileName)}'`, `duration ${duration.toFixed(4)}`)
})
concatLines.push(`file '${path.join(takeDir, 'frames', keptFrames.at(-1)[0])}'`)
fs.writeFileSync(path.join(takeDir, 'frames.txt'), concatLines.join('\n'))

// Captions → ASS subtitles inside the band
const pageWidth = 2560
const pageHeight = 1440
const bandHeight = 200
const formatAssTime = (seconds) => {
	const centiseconds = Math.round(seconds * 100)
	const hours = Math.floor(centiseconds / 360000)
	const minutes = Math.floor((centiseconds % 360000) / 6000)
	const secs = Math.floor((centiseconds % 6000) / 100)
	return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centiseconds % 100).padStart(2, '0')}`
}
const captionEvents = timeline.captions
	.map((caption, index) => ({
		text: caption.text,
		start: toVideoTime(caption.at),
		end: index + 1 < timeline.captions.length ? toVideoTime(timeline.captions[index + 1].at) : videoEnd,
	}))
	.filter((caption) => caption.text && caption.end - caption.start > 0.2)
const assLines = [
	'[Script Info]',
	'ScriptType: v4.00+',
	`PlayResX: ${pageWidth}`,
	`PlayResY: ${pageHeight + bandHeight}`,
	'',
	'[V4+ Styles]',
	'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
	`Style: Caption,Helvetica Neue,72,&H001A1A1A,&H001A1A1A,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,2,80,80,${Math.round(bandHeight / 2 - 40)},1`,
	'',
	'[Events]',
	'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
	...captionEvents.map(
		(caption) => `Dialogue: 0,${formatAssTime(caption.start)},${formatAssTime(caption.end)},Caption,,0,0,0,,{\\fad(180,120)}${caption.text}`,
	),
]
const assFile = path.join(takeDir, 'captions.ass')
fs.writeFileSync(assFile, assLines.join('\n'))

const filter = [
	`scale=${pageWidth}:${pageHeight}`,
	'fps=30',
	`pad=${pageWidth}:${pageHeight + bandHeight}:0:0:color=0xF3F1ED`,
	`subtitles='${assFile}'`,
	'scale=1920:-2:flags=lanczos',
	'format=yuv420p',
].join(',')
execFileSync(
	'ffmpeg',
	['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(takeDir, 'frames.txt'), '-vf', filter,
		'-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-movflags', '+faststart', '-an', outputFile],
	{ stdio: 'inherit' },
)
console.log('video length', videoEnd.toFixed(1), 's →', outputFile)
