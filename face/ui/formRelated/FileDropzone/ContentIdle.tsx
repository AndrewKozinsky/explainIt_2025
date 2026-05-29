import { filesUrls } from 'utils/filesUrls'

type ContentIdleProps = {
	supportedFormatsStr: string
}

function ContentIdle(props: ContentIdleProps) {
	const { supportedFormatsStr } = props

	return (
		<div className='file-dropzone file-dropzone--idle'>
			<img src={filesUrls.images.common.filesGray} alt='files' />
			<div className='file-dropzone__content'>
				<p className='file-dropzone__text file-dropzone__text--idle'>Перетащите файл или нажмите для выбора</p>
				<p className='file-dropzone__sub-text file-dropzone__sub-text--idle'>{supportedFormatsStr}</p>
			</div>
		</div>
	)
}

export default ContentIdle
