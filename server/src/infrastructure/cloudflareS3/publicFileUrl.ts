/** Public static assets in immersia-public; no signing or storage request is needed. */
export function getPublicFileUrl(key: string): string {
	return `https://files.immersia.site/${key.split('/').map(encodeURIComponent).join('/')}`
}
