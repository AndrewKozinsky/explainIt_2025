import { useState } from 'react'
import { useTranslations } from 'next-intl'

type AvatarImageProps = { url: string; alt: string }

function AvatarImage({ url, alt }: AvatarImageProps) {
	const t = useTranslations('mePage.avatar')
	const [failedUrl, setFailedUrl] = useState<string | null>(null)
	if (failedUrl === url) return <span className='user-profile-form__image-error'>{t('imageUnavailable')}</span>

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
