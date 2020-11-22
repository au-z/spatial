import SpatialHeader, { CustomElement } from './ui/spatial-header'
const components = [SpatialHeader]

import {gaussArea, monotoneChain} from './Path'
import Canvas from './Canvas'
import CanvasPoint from './CanvasPoint'
import CanvasSegment from './CanvasSegment'
import Node from './index/rtree'

const {canvas, ctx} = Canvas.create()
const header: CustomElement = document.getElementsByTagName('spatial-header')?.[0] as HTMLElement

const points = []
let segment: CanvasSegment
let tree = new Node({left: 0, top: 0, width: canvas.width, height: canvas.height})
let area = 0

canvas.addEventListener('click', addPoint)

requestAnimationFrame(renderCanvas)

function addPoint({layerX, layerY}: any) {
	const point = new CanvasPoint(layerX, layerY, 4)
	points.push(point)
	tree.insert(point)

	if(points.length < 3) return

	const convexHull = monotoneChain(points.map((p) => p.xy()))
	segment = new CanvasSegment(convexHull)

	area = gaussArea(convexHull)
	header.area = area
}

function renderCanvas() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	points.forEach((p) => p.draw(ctx))
	segment?.draw(ctx)
	tree.draw(ctx)

	requestAnimationFrame(renderCanvas)
}

let t = new Node({left: 0, top: 0, width: 30, height: 30}, [
	new CanvasPoint(5, 5),
	new CanvasPoint(15, 5),
	new CanvasPoint(25, 5),
	new CanvasPoint(5, 15),
	new CanvasPoint(15, 15),
	new CanvasPoint(25, 15),
	new CanvasPoint(5, 25),
	new CanvasPoint(15, 25),
	new CanvasPoint(25, 25),
])

t.insert(new CanvasPoint(21, 21))
t.insert(new CanvasPoint(23, 23))
t.insert(new CanvasPoint(25, 25))
t.insert(new CanvasPoint(27, 27))
t.insert(new CanvasPoint(29, 29))
t.insert(new CanvasPoint(22, 23))
t.insert(new CanvasPoint(24, 25))
t.insert(new CanvasPoint(26, 27))
t.insert(new CanvasPoint(28, 29))

t.insert(new CanvasPoint(26, 21))

console.log(t)