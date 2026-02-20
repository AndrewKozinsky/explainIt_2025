import React from 'react'

function ContentIdle() {
	return (
		<div className='video-dropzone video-dropzone--idle'>
			<p className='video-dropzone__header video-dropzone__header--idle'>Перетащите видео сюда</p>
			<p className='video-dropzone__description'>Поддерживаются MP4, WebM, OGG, MKV</p>
		</div>
	)
}

export default ContentIdle
