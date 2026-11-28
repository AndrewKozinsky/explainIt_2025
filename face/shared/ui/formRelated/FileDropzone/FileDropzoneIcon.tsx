const fileShape = 'M5.5 0.5h20l14 14v31a5 5 0 0 1-5 5h-29a5 5 0 0 1-5-5v-40a5 5 0 0 1 5-5Z'
const foldShape = 'M25.5 0.5v11a3 3 0 0 0 3 3h11'

type FileDropzoneIconProps = {
	outline: boolean
	error: boolean
}

function FileDropzoneIcon({ outline, error }: FileDropzoneIconProps) {
	return (
		<svg className='file-dropzone__icon' viewBox='0 0 40 51' aria-hidden='true' focusable='false'>
			{outline ? (
				<g fill='none' stroke='currentColor' strokeDasharray='2 2'>
					<path d={fileShape} />
					<path d={foldShape} />
				</g>
			) : (
				<>
					<path d={fileShape} fill='currentColor' />
					<path d={`${foldShape}Z`} fill='#fff' fillOpacity='.4' />
					<g fill='none' stroke='#fff' strokeLinecap='round' strokeLinejoin='round'>
						{error ? (
							<>
								<path d='M18.7 21.5a1.5 1.5 0 0 1 2.6 0l7.7 13a1.5 1.5 0 0 1-1.3 2.25H12.3A1.5 1.5 0 0 1 11 34.5Z' />
								<path d='M20 26v4.5m0 2.75v.25' />
							</>
						) : (
							<>
								<path d='M28.5 31a8.5 8.5 0 1 1-17 0 8.5 8.5 0 1 1 17 0Z' />
								<path d='M16 31l4-4 4 4m-4-4v8' />
							</>
						)}
					</g>
				</>
			)}
		</svg>
	)
}

export default FileDropzoneIcon
