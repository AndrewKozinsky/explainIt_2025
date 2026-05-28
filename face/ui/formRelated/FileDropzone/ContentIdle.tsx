type ContentIdleProps = {
	idleText: string
}

function ContentIdle(props: ContentIdleProps) {
	return (
		<div className='file-dropzone file-dropzone--idle'>
			<p className='file-dropzone__header file-dropzone__header--idle'>{props.idleText}</p>
		</div>
	)
}

export default ContentIdle
