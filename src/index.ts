import SpatialHeader, { CustomElement } from './ui/spatial-header'
const components = [SpatialHeader]

import {gaussArea, monotoneChain} from './Path'
import Canvas from './Canvas'
import CanvasPoint from './CanvasPoint'

const {canvas, ctx} = Canvas.create()
const header: CustomElement = document.getElementsByTagName('spatial-header')?.[0]

const points = []
let area = 0

canvas.addEventListener('click', addPoint)

function addPoint({layerX, layerY}: any) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	points.push(new CanvasPoint(layerX, layerY, 4))
	points.forEach((p) => p.draw(ctx))

	if(points.length < 3) return
	const convexHull = monotoneChain(points.map((p) => p.xy()))
	area = gaussArea(convexHull)
	header.area = area
	console.log('AREA', area)

	drawSegments(convexHull)
}

function drawSegments(points: [number, number][]) {
	ctx.strokeStyle = '#ff0000'
	ctx.beginPath()
	points.forEach((p) => ctx.lineTo(p[0], p[1]))
	ctx.lineTo(points[0][0], points[0][1])
	ctx.stroke()
}
