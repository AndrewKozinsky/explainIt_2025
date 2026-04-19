export type Status = 'loading' | 'error' | 'ready' | 'idle'

export type AudioData = {
	status: Status
	url?: string
}

export type TranscriptionData = {
	status: Status
	ipa?: string | null
}
