export const playerControlConfig = {
	rewindSeconds: 2,
	rewindSecondsShift: 6,
	longPressDelayMs: 250,
	cursorMoveThresholdPx: 3,
	reverseHoldSpeed: 2,
	forwardHoldSpeed: 2,
} as const

export type PlayerControlConfig = typeof playerControlConfig
