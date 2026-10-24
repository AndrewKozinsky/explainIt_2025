export async function cookies(): Promise<never> {
	throw new Error('Server-only headers are unavailable in the browser fixture')
}
