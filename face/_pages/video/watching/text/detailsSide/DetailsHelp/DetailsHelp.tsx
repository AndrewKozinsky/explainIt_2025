import Tabs from 'ui/Tabs/Tabs'
import { publicFolderFilesUrls } from 'utils/publicFolderFilesUrls'
import { useWatchingStore } from '_pages/video/watching/watchingStore'
import { tabsConfig } from './fn/tabsConfig'
import './DetailsHelp.scss'

function DetailsHelp() {
	const helpCurrentContentType = useWatchingStore((s) => s.helpCurrentContentType)

	return (
		<div className='details-help'>
			<div className='details-help__tabs'>
				<Tabs currentTabId={helpCurrentContentType} tabsConfig={tabsConfig} />
			</div>
			<div className='details-help__item'>
				<h3 className='details-help__header'>Проигрыватель</h3>
				{helpCurrentContentType === 'keyboard' ? <KeyboardPlayer /> : <MousePlayer />}
			</div>
			<div className='details-help__item'>
				<h3 className='details-help__header'>Перевод</h3>
				{helpCurrentContentType === 'keyboard' ? <KeyboardTranslation /> : <MouseTranslation />}
			</div>
		</div>
	)
}

export default DetailsHelp

function KeyboardPlayer() {
	return (
		<Content>
			<p>
				<Key>Пробел</Key> для запуска воспроизведения
			</p>
			<p>
				<Key>←</Key> или <Key>→</Key> для перемотки
			</p>
			<p>
				<Key>Shift</Key> + <Key>←</Key> или <Key>→</Key> для ускоренной перемотки
			</p>
		</Content>
	)
}

function KeyboardTranslation() {
	return (
		<Content>
			<p>Выделите слово для перевода</p>
		</Content>
	)
}

function MouseTranslation() {
	return (
		<Content>
			<p>Нажмите на слово для перевода</p>
		</Content>
	)
}

function MousePlayer() {
	return <img src={publicFolderFilesUrls.video.helpFilmFrame} alt='icon' />
}

function Content({ children }: { children: React.ReactNode }) {
	return <div className='details-help__content'>{children}</div>
}

function Key({ children }: { children: string }) {
	return <span className='details-help__key'>{children}</span>
}
