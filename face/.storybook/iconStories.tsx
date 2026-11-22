import type { ComponentType } from 'react'
import type { ButtonIconProps } from '../shared/ui/icons/buttonIcons/standard/buttonProps'

export type IconStoryArgs = ButtonIconProps & {
	color: string
	backgroundColor: string
}

export const iconStoryArgs: IconStoryArgs = {
	color: '#252525',
	backgroundColor: '#ffffff',
	extraClass: '',
}

export const iconStoryArgTypes = {
	color: { control: 'color' as const, description: 'Inherited currentColor. Fixed SVG colors stay unchanged.' },
	backgroundColor: { control: 'color' as const, description: 'Preview background.' },
	extraClass: { control: 'text' as const, description: 'CSS class passed to the icon component.' },
}

export function renderIcon(Icon: ComponentType<ButtonIconProps>) {
	return function IconPreview({ color, backgroundColor, extraClass }: IconStoryArgs) {
		return (
			<div style={{ display: 'inline-flex', padding: 24, color, backgroundColor }}>
				<Icon extraClass={extraClass} />
			</div>
		)
	}
}

export function renderIconGallery(icons: Record<string, ComponentType<ButtonIconProps>>) {
	return function IconGallery({ color, backgroundColor, extraClass }: IconStoryArgs) {
		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
					gap: 16,
					padding: 24,
					color,
					backgroundColor,
				}}
			>
				{Object.entries(icons).map(([name, Icon]) => (
					<div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 40 }}>
						<span aria-hidden='true' style={{ display: 'flex', justifyContent: 'center', minWidth: 80 }}>
							<Icon extraClass={extraClass} />
						</span>
						<span style={{ fontSize: 12, overflowWrap: 'anywhere' }}>{name}</span>
					</div>
				))}
			</div>
		)
	}
}
