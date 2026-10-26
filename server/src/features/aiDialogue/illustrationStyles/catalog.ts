export type AiDialogueIllustrationStyle = {
	id: string
	titleKey: string
	file: string
	stylePrompt: string
}

export type AiDialogueIllustrationStyleCatalog = {
	defaultStyleId: string
	styles: AiDialogueIllustrationStyle[]
}

/** Добавление стиля требует только записи здесь и файла в R2 для нужного MODE. */
export const aiDialogueIllustrationStyleCatalog: AiDialogueIllustrationStyleCatalog = {
	defaultStyleId: 'realism',
	styles: [
		{
			id: 'realism',
			titleKey: 'aiDialogue.illustrationStyles.realism',
			file: 'realism.webp',
			stylePrompt:
				'Photorealistic editorial lifestyle photography. Natural skin, hair, fabric and material textures, physically plausible soft daylight, realistic adult proportions and natural expressions. Render the whole scene consistently as a real photograph. No illustration, cartoon, watercolor, painting, 3D render, text, UI, frames or watermarks.',
		},
		{
			id: 'drawing',
			titleKey: 'aiDialogue.illustrationStyles.drawing',
			file: 'drawing.webp',
			stylePrompt:
				'Modern editorial drawing with a subtle graphic-novel influence. Clear expressive ink outlines, simplified anatomically realistic adult shapes, restrained colored-pencil grain, designed color fills and gentle shadow planes. Readable faces and balanced warm colors. No photorealism, watercolor washes, caricature, anime, 3D render, text, UI, frames or watermarks.',
		},
		{
			id: 'watercolor',
			titleKey: 'aiDialogue.illustrationStyles.watercolor',
			file: 'watercolor.webp',
			stylePrompt:
				'Traditional transparent watercolor on textured cold-pressed paper. Layered translucent pigment washes, delicate granulation, soft wet-on-wet edges and restrained crisp brush accents on readable faces. Natural adult proportions, warm daylight and balanced colors. Paint edge-to-edge without a paper border. No photorealism, heavy ink outlines, cel shading, impasto, caricature, 3D render, text, UI, frames or watermarks.',
		},
	],
}
