import RouteNames from 'infrastructure/routeNames'

export const queriesVideoPrivate = {
	create(dto: {
		name?: null | string
		subtitles?: null | string
		fileName?: null | string
		fileMimeType?: null | string
	}) {
		return {
			query: `
				mutation CreateVideoPrivate($input: CreatePrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.CREATE}(input: $input) {
						id
						name
						subtitles
						userId
						uploadUrl
					}
				}`,
			variables: {
				input: dto,
			},
		}
	},
	update(dto: {
		id: number
		name?: null | string
		subtitles?: null | string
		fileName?: null | string
		fileMimeType?: null | string
	}) {
		return {
			query: `
				mutation UpdateVideoPrivate($input: UpdatePrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.UPDATE}(input: $input) {
						id
						name
						subtitles
						userId
						uploadUrl
					}
				}`,
			variables: {
				input: dto,
			},
		}
	},
}
