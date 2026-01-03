import RouteNames from 'infrastructure/routeNames'

export const queriesVideoPrivate = {
	create(dto: {
		name?: null | string
		text?: null | string
		fileName?: null | string
		fileMimeType?: null | string
	}) {
		return {
			query: `
				mutation CreateVideoPrivate($input: CreatePrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.CREATE}(input: $input) {
						id
						name
						text
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
		text?: null | string
		fileName?: null | string
		fileMimeType?: null | string
	}) {
		return {
			query: `
				mutation UpdateVideoPrivate($input: UpdatePrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.UPDATE}(input: $input) {
						id
						name
						text
						userId
						uploadUrl
					}
				}`,
			variables: {
				input: dto,
			},
		}
	},
	delete(dto: { id: number }) {
		return {
			query: `
				mutation DeleteVideoPrivate($input: DeletePrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.DELETE}(input: $input)
				}`,
			variables: {
				input: dto,
			},
		}
	},
	getUserVideos() {
		return `query {
			${RouteNames.VIDEO_PRIVATE.GET_USER_VIDEOS} {
				id
				name
				text
				userId
			}
		}`
	},
	get(dto: { id: number }) {
		return {
			query: `
				query GetVideoPrivate($input: GetPrivateVideoInput!) {
					${RouteNames.VIDEO_PRIVATE.GET}(input: $input) {
						id
						name
						isFileUploaded
						text
						userId
					}
				}`,
			variables: {
				input: dto,
			},
		}
	},
}
