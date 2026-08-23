import { useRef } from 'react'

/**
 * Стабилизирует URL обложки.
 *
 * Сервер отдаёт обложку из S3 как pre-signed URL и генерирует новую подпись при каждом GET.
 * Поэтому после перефетча видео (например, после сохранения формы) строка URL меняется,
 * хотя картинка та же. Браузер считает это новым изображением и загружает его заново —
 * обложка мигает.
 *
 * Держим ранее полученный URL и меняем его, только когда меняется сама картинка.
 * Идентификатор картинки — ключ файла в S3, а для внешних обложек (например, превью
 * с YouTube) — сам URL, который в этом случае стабилен.
 *
 * @param coverIdentity — идентификатор картинки: `coverFileS3Key ?? coverUrl`
 * @param coverUrl — текущий URL обложки из данных видео
 */
export function useStableCoverUrl(coverIdentity: string | null, coverUrl: string | null): string | null {
	const stableCoverRef = useRef({ identity: coverIdentity, url: coverUrl })

	// Картинка сменилась (загрузили новую обложку, удалили её или открыли другое видео)
	// либо URL ещё не был получен — берём свежее значение
	if (stableCoverRef.current.identity !== coverIdentity || stableCoverRef.current.url === null) {
		stableCoverRef.current = { identity: coverIdentity, url: coverUrl }
	}

	return stableCoverRef.current.url
}
