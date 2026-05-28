// import fs from 'fs'
// import path from 'path'
// import { getContentDir } from './getContentDir'

/*export type CategoryInfo = {
	sourceLanguage: string
	targetLanguage: string
	category: string
}*/

/*export async function getCategories(): Promise<CategoryInfo[]> {
	const contentDir = getContentDir()

	if (!fs.existsSync(contentDir)) return []

	const result: CategoryInfo[] = []
	const targetEntries = fs.readdirSync(contentDir, { withFileTypes: true })

	for (const targetEntry of targetEntries) {
		if (!targetEntry.isDirectory()) continue

		const targetLang = targetEntry.name
		const targetDir = path.join(contentDir, targetLang)

		const sourceEntries = fs.readdirSync(targetDir, { withFileTypes: true })

		for (const sourceEntry of sourceEntries) {
			if (!sourceEntry.isDirectory()) continue

			const sourceLang = sourceEntry.name
			const sourceDir = path.join(targetDir, sourceLang)

			const categoryEntries = fs.readdirSync(sourceDir, { withFileTypes: true })

			for (const catEntry of categoryEntries) {
				if (!catEntry.isDirectory()) continue
				result.push({
					sourceLanguage: sourceLang,
					targetLanguage: targetLang,
					category: catEntry.name,
				})
			}
		}
	}

	return result
}*/
