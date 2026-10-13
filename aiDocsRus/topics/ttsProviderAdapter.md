# Инфраструктурный адаптер Text to speech

`server/src/infrastructure/ttsProviderAdapter` содержит `TtsAdapterService` и поставщиков OpenAI / Google.
Сервис делает только синтез текста и возвращает `Promise<Buffer>` с исходными аудиобайтами.
БД, R2, HTTP-маршруты, кеш, очереди и баланс пользователя не входят в его обязанности.

## Подключение

Импортировать `TtsProviderModule` в Nest-модуль потребителя и внедрить `TtsAdapterService` через конструктор.
Модуль не глобальный. Его использует worker озвучки диалогов с OpenAI; HTTP-процесс только готовит задания.
Подробнее: [`aiDialogue/aiDialogueAudio.md`](aiDialogue/aiDialogueAudio.md).
Клиенты создаются лениво, только при генерации соответствующим поставщиком.
Конфигурация берётся из существующего `MainConfigService`: `openAI.apiKey` и `googleTts.serviceAccountCredentials`.
Новых переменных окружения нет.

## Контракт

`TtsGenerateInput` — discriminated union с обязательным `type: 'OpenAI' | 'Google'`.
TypeScript проверяет отдельные параметры каждого поставщика. Runtime-валидация отклоняет неизвестные поля
и некорректные значения до создания клиента и отправки запроса.
Общие поля: `text`, необязательный `timeoutMs` (по умолчанию 60 секунд для адаптера).
Текст не обрезается, не переводится и не делится на части автоматически.

### OpenAI

```ts
const audio: Buffer = await this.ttsAdapter.generate({
	type: 'OpenAI',
	text: 'Welcome! Let us practise English together.',
	model: 'gpt-4o-mini-tts',
	voice: 'cedar',
	instructions: 'Speak warmly and clearly, with a British English accent.',
	speed: 0.9,
	responseFormat: 'mp3',
})
```

Поддерживаются `gpt-4o-mini-tts` и снимок `gpt-4o-mini-tts-2025-12-15`, встроенные голоса из
`OPENAI_TTS_VOICES`, инструкции до 4096 символов, скорость 0.25..4, форматы
`mp3` (по умолчанию), `opus`, `aac`, `flac`, `wav`, `pcm`. Входной текст — до 4096 символов.
Также можно передать `abortSignal`. Язык отдельным полем не передаётся: используется язык текста;
акцент и манера речи задаются инструкциями. Custom voices и модели `tts-1` / `tts-1-hd` пока не включены в контракт.

Используется `audio.speech.create` с `stream_format: 'audio'`. Потребитель получает полностью прочитанный Buffer,
а не поток SSE. Формат нужно учитывать при сохранении файла: MP3 соответствует `audio/mpeg`, WAV — `audio/wav`.
PCM — сырые аудиоданные без заголовка; адаптер их не перекодирует.

### Google

```ts
const audio: Buffer = await this.ttsAdapter.generate({
	type: 'Google',
	text: 'Hello! Let us practise pronunciation.',
	voice: { languageCode: 'en-US', name: 'en-US-Standard-B' },
	audioConfig: { audioEncoding: 'MP3', speakingRate: 0.9, pitch: -2 },
})
```

`voice.languageCode` обязателен и принимает локаль Google, например `en-US` / `en-GB`.
`voice.name` и `ssmlGender` (`MALE` / `FEMALE` / `NEUTRAL`) необязательны.
Обязателен `audioConfig.audioEncoding`: `LINEAR16`, `MP3`, `OGG_OPUS`, `MULAW` или `ALAW`.
Дополнительно доступны `speakingRate` (0.25..2), `pitch` (-20..20), `volumeGainDb` (-96..16),
`sampleRateHertz` и `effectsProfileId`. Ограничение текста проверяется в UTF-8 байтах: до 5000.
Совместимость конкретного голоса с настройками проверяет Google API; адаптер не подменяет голос или настройки.
Произвольные инструкции стиля и AbortSignal для Google не заявлены.

Google-поставщик использует расширенный `GoogleTtsService.synthesizeAudio`.
Существующий `generateAudio(text, languageCode)` сохраняет прежние голоса, формат OGG_OPUS и настройки SDK;
текущая озвучка фраз продолжает вызывать его напрямую.
Строковый base64-ответ SDK корректно декодируется, Uint8Array копируется в Buffer.

## Ошибки и повторы

`TtsError` содержит безопасное сообщение, `code` и `outcome` (`not_sent` / `unknown`).
Коды: `invalid_input`, `configuration`, `aborted`, `request_failed`, `invalid_response`.
Текст, ключи и исходные ошибки SDK не включаются в сообщение.
Пустой результат не возвращается как успешная генерация.

Адаптер не повторяет запросы и не переключает поставщика при ошибке.
OpenAI вызывается с `maxRetries: 0`; Google — с `retry: null` и тайм-аутом.
`unknown` означает, что отправка началась и надёжный результат не получен;
это не доказывает отсутствие оплаты и не является разрешением на автоматическую повторную генерацию.

## Проверки

Изолированные тесты проверяют маршрутизацию, параметры, ограничения до отправки, байты,
ошибки и отмену, совместимость старого Google-вызова, регистрацию модуля без создания клиентов.
Настоящий OpenAI SDK с подменённым fetch проверяет единственный POST при HTTP 503.
Тесты не делают внешних запросов и не списывают деньги.
Отдельный настоящий Nest TestingModule с подменённым MainConfigService подтвердил регистрацию фасада
без чтения конфигурации и создания клиентов. `npm run build`, `npx tsc --noEmit --incremental false`,
`npm test` и `git diff --check` проходят: 311 успешных тестов, 14 ранее существовавших пропущены.

Официальные источники:
[OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create),
[OpenAI TTS](https://developers.openai.com/api/docs/guides/text-to-speech),
[Google text.synthesize](https://docs.cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize),
[Google AudioConfig](https://docs.cloud.google.com/text-to-speech/docs/reference/rest/v1/AudioConfig).
