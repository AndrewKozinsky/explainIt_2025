export const VIDEO_TOPICS = [
	'Travel & Geography',
	'Technology & Science',
	'Language Learning',
	'Interviews & Podcasts',
	'News & Current Events',
	'Culture & Arts',
	'Food & Cooking',
	'Sports & Fitness',
	'Music & Entertainment',
	'History & Philosophy',
	'Business & Finance',
	'Health & Medicine',
	'Nature & Environment',
	'Daily Life & Vlogs',
	'Humor & Comedy',
	'Film & Literature',
	'Self-Development',
	'Design & Creativity',
] as const

export type VideoTopic = (typeof VIDEO_TOPICS)[number]
