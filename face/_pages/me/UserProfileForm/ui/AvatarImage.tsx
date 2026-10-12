import { useState } from 'react'

type AvatarImageProps = { url: string; alt: string }

function AvatarImage({ url, alt }: AvatarImageProps) {
	const [failedUrl, setFailedUrl] = useState<string | null>(null)
	if (failedUrl === url) return <span className='user-profile-form__image-error'>Изображение недоступно</span>

	return (
		<img
			src={url}
			alt={alt}
			onError={function () {
				setFailedUrl(url)
			}}
		/>
	)
}

export default AvatarImage
