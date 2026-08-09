import { Readable } from 'stream'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { parseIso8601Duration } from 'utils/parseIso8601Duration'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { downloadAudio as downloadAudioFn } from './fn/downloadAudio'
import { getSubtitles as getSubtitlesFn } from './fn/getSubtitles'
import type {
	SearchVideosParams,
	YoutubeChannelsResponse,
	YoutubeSearchItem,
	YoutubeSearchResponse,
	YoutubeSubtitleResult,
	YoutubeVideoData,
	YoutubeVideoItem,
	YoutubeVideosResponse,
} from './youtube.types'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

@Injectable()
export class YoutubeService {
	constructor(private mainConfig: MainConfigService) {}

	/** Получить данные одного видео с YouTube по его ID. */
	async getVideoById(videoId: string): Promise<YoutubeVideoData> {
		const apiKey = this.mainConfig.get().youTube.apiKey

		const detailsById = await this.getVideoDetails(apiKey, [videoId])
		const details = detailsById.get(videoId)
		if (!details) {
			throw new CustomError(errorMessage.youtube.videoNotFound, ErrorStatusCode.NotFound_404)
		}

		const channelId = details.snippet.channelId
		const channelLogoMap = await this.getChannelLogos(apiKey, [channelId])

		return {
			videoId,
			title: details.snippet.title,
			channelName: details.snippet.channelTitle,
			channelLogoUrl: channelLogoMap.get(channelId) ?? null,
			thumbnailUrl:
				details.snippet.thumbnails.high?.url ??
				details.snippet.thumbnails.medium?.url ??
				details.snippet.thumbnails.default?.url ??
				'',
			viewCount: details.statistics.viewCount ? Number(details.statistics.viewCount) : 0,
			durationSec: parseIso8601Duration(details.contentDetails.duration ?? '') ?? 0,
			defaultAudioLanguage: details.snippet.defaultAudioLanguage ?? null,
			ratio: `${details.player?.embedWidth ?? 1280} / ${details.player?.embedHeight ?? 720}`,
		}
	}

	/**
	 * Скачать аудиодорожку YouTube-видео в виде читаемого потока.
	 * Использует yt-dlp (через youtube-dl-exec) для получения лучшего аудиоформата
	 * и отдаёт stdout как Readable.
	 *
	 * @param videoId — идентификатор видео на YouTube (например, "dQw4w9WgXcQ")
	 * @returns поток с аудиоданными в лучшем доступном формате
	 */
	downloadAudio(videoId: string): Promise<Readable> {
		return downloadAudioFn(videoId)
	}

	/** Получить список видео с YouTube для указанного языка и поискового запроса. */
	async getVideos(params: SearchVideosParams): Promise<{
		videos: YoutubeVideoData[]
		nextPageToken: null | string
		totalResults: number
	}> {
		const apiKey = this.mainConfig.get().youTube.apiKey

		const searchResponse = await this.searchVideos(apiKey, params)

		const videoIds = searchResponse.items.map((item) => item.id.videoId)
		if (videoIds.length === 0) {
			return { videos: [], nextPageToken: null, totalResults: searchResponse.pageInfo.totalResults }
		}

		const detailsById = await this.getVideoDetails(apiKey, videoIds)

		const channelIds = [...new Set(Object.values(detailsById).map((v) => v.snippet.channelId))]
		const channelLogoMap = await this.getChannelLogos(apiKey, channelIds)

		const videos = this.mergeVideosWithDetails(searchResponse.items, detailsById, channelLogoMap)

		return {
			videos,
			nextPageToken: searchResponse.nextPageToken ?? null,
			totalResults: searchResponse.pageInfo.totalResults,
		}
	}

	// ─── Шаг 1: поиск видео ────────────────────────────────────────────────

	private async searchVideos(apiKey: string, params: SearchVideosParams): Promise<YoutubeSearchResponse> {
		const { query, limit, pageToken } = params

		const url = new URL(`${YOUTUBE_API_BASE}/search`)
		url.searchParams.set('part', 'snippet')
		url.searchParams.set('type', 'video')
		url.searchParams.set('q', query)
		url.searchParams.set('maxResults', String(limit))
		url.searchParams.set('key', apiKey)
		if (pageToken) {
			url.searchParams.set('pageToken', pageToken)
		}

		return this.request<YoutubeSearchResponse>(url)
	}

	// ─── Шаг 2: детали видео (статистика, длительность) ────────────────────

	private async getVideoDetails(apiKey: string, videoIds: string[]): Promise<Map<string, YoutubeVideoItem>> {
		const url = new URL(`${YOUTUBE_API_BASE}/videos`)
		url.searchParams.set('part', 'snippet,statistics,contentDetails,player')
		url.searchParams.set('id', videoIds.join(','))
		url.searchParams.set('key', apiKey)

		const response = await this.request<YoutubeVideosResponse>(url)

		return new Map(response.items.map((v) => [v.id, v]))
	}

	// ─── Шаг 3: логотипы каналов ───────────────────────────────────────────

	private async getChannelLogos(apiKey: string, channelIds: string[]): Promise<Map<string, string>> {
		if (channelIds.length === 0) return new Map()

		try {
			const url = new URL(`${YOUTUBE_API_BASE}/channels`)
			url.searchParams.set('part', 'snippet')
			url.searchParams.set('id', channelIds.join(','))
			url.searchParams.set('key', apiKey)

			const response = await this.request<YoutubeChannelsResponse>(url)

			const map = new Map<string, string>()

			for (const channel of response.items ?? []) {
				const logoUrl = channel.snippet.thumbnails.default?.url ?? ''

				if (logoUrl) {
					map.set(channel.id, logoUrl)
				}
			}
			return map
		} catch {
			return new Map()
		}
	}

	// ─── Субтитры ───────────────────────────────────────────────────────────

	/**
	 * Получить субтитры YouTube-видео на указанном языке.
	 *
	 * Приоритет: ручные субтитры → автосгенерированные → null.
	 *
	 * @param videoId — идентификатор видео на YouTube (например, "dQw4w9WgXcQ")
	 * @param language — код языка (например, "en", "ru", "de")
	 * @returns субтитры в формате SRT или null, если субтитры не найдены
	 */
	async getSubtitles(videoId: string, language: string): Promise<YoutubeSubtitleResult | null> {
		return getSubtitlesFn(videoId, language)
	}

	// ─── Шаг 4: сборка результата ──────────────────────────────────────────

	private mergeVideosWithDetails(
		searchItems: YoutubeSearchItem[],
		detailsById: Map<string, YoutubeVideoItem>,
		channelLogoMap: Map<string, string>,
	): YoutubeVideoData[] {
		return searchItems.map((searchItem) => {
			const videoId = searchItem.id.videoId
			const details = detailsById.get(videoId)
			const snippet = details?.snippet ?? searchItem.snippet

			return {
				videoId,
				title: snippet.title,
				channelName: snippet.channelTitle,
				channelLogoUrl: channelLogoMap.get(snippet.channelId) ?? null,
				thumbnailUrl:
					snippet.thumbnails.high?.url ??
					snippet.thumbnails.medium?.url ??
					snippet.thumbnails.default?.url ??
					'',
				viewCount: details?.statistics.viewCount ? Number(details.statistics.viewCount) : 0,
				durationSec: parseIso8601Duration(details?.contentDetails.duration ?? '') ?? 0,
				defaultAudioLanguage: details?.snippet.defaultAudioLanguage ?? null,
				ratio: `${details?.player?.embedWidth ?? 1280} / ${details?.player?.embedHeight ?? 720}`,
			}
		})
	}

	// ─── HTTP-запрос ───────────────────────────────────────────────────────

	private async request<T>(url: URL): Promise<T> {
		try {
			const response = await axios.get<T>(url.toString())
			return response.data
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 403) {
				throw new CustomError(errorMessage.youtube.quotaExceeded, ErrorStatusCode.Forbidden_403)
			}

			throw new CustomError(errorMessage.youtube.apiRequestFailed, ErrorStatusCode.InternalServerError_500)
		}
	}
}
