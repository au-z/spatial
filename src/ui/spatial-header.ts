import {define, html, Hybrids} from 'hybrids'
import '@auzmartist/cam-el'
import styles from './spatial-header.styl'

export interface CustomElement extends HTMLElement {
	[key: string]: any
}

const SpatialHeader: Hybrids<CustomElement> = {
	area: 0,
	render: ({area}) => html`<cam-box p="2 0" flex="flex-start center">
		<div>
			<label>Area: </label>&nbsp;<span>${area}</span>
		</div>
	</cam-box>`.style(styles)
}

define('spatial-header', SpatialHeader)
export default SpatialHeader