// SCSS side-effect imports (e.g. import './Component.scss')
declare module '*.scss'

// SCSS CSS Modules (e.g. import styles from './Component.module.scss')
declare module '*.module.scss' {
	const classes: { readonly [key: string]: string }
	export default classes
}
