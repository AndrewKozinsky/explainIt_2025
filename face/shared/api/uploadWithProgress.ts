export type UploadProgressCallbacks = {
	onProgress: (loaded: number, total: number) => void
	onTransferComplete: () => void
}

type UploadRequestOptions = {
	method?: string
	headers: Headers
	signal?: AbortSignal | null
}

export function uploadWithProgress(
	url: string,
	body: FormData,
	{ method = 'POST', headers, signal }: UploadRequestOptions,
	callbacks: UploadProgressCallbacks,
): Promise<Response> {
	return new Promise((resolve, reject) => {
		signal?.throwIfAborted()
		const xhr = new XMLHttpRequest()
		xhr.upload.onprogress = ({ lengthComputable, loaded, total }) => {
			if (lengthComputable) callbacks.onProgress(loaded, total)
		}
		xhr.upload.onload = callbacks.onTransferComplete
		xhr.open(method, url)
		xhr.withCredentials = true
		headers.forEach((value, name) => xhr.setRequestHeader(name, value))

		function abort() {
			xhr.abort()
		}

		xhr.onload = () => {
			const responseHeaders = new Headers()
			for (const line of xhr.getAllResponseHeaders().split(/\r?\n/)) {
				const separator = line.indexOf(':')
				if (separator > 0) responseHeaders.append(line.slice(0, separator), line.slice(separator + 1))
			}

			const responseBody = [204, 205, 304].includes(xhr.status) ? null : xhr.responseText

			resolve(
				new Response(responseBody, {
					status: xhr.status,
					statusText: xhr.statusText,
					headers: responseHeaders,
				}),
			)
		}

		xhr.onerror = () => reject(new TypeError('Upload request failed'))
		xhr.onabort = () => reject(signal?.reason ?? new DOMException('Upload aborted', 'AbortError'))
		xhr.onloadend = () => signal?.removeEventListener('abort', abort)

		xhr.send(body)
		signal?.addEventListener('abort', abort, { once: true })
	})
}
