import React from 'react'

type HotKeyButtonProps = {
	text: string
}
export function HotKeyButton(props: HotKeyButtonProps) {
	const { text } = props

	return <div className='hint-block__hot-key'>{text}</div>
}
