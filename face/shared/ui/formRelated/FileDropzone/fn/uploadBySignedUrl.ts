/** Загрузка по подписанной ссылке с настоящим прогрессом передачи. */
export function uploadBySignedUrl(url: string, file: File, onProgress: (loaded: number, total: number) => void) {
	return new Promise<void>(function (resolve, reject) {
		const xhr = new XMLHttpRequest()

		xhr.open('PUT', url)
		xhr.setRequestHeader('Content-Type', file.type)
		xhr.upload.onprogress = function (event) {
			if (event.lengthComputable) onProgress(event.loaded, event.total)
		}
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) resolve()
			else reject(new Error('Не удалось загрузить файл'))
		}
		xhr.onerror = function () {
			reject(new Error('Не удалось загрузить файл'))
		}
		xhr.onabort = function () {
			reject(new Error('Загрузка файла отменена'))
		}
		xhr.send(file)
	})
}
