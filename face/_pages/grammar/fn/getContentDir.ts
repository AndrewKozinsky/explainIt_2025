import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getContentDir() {
	return CONTENT_DIR
}
