export default class CanvasSegment {
	private points: [number, number][]

	constructor(points) {
		this.points = points
	}

	draw(ctx) {
		if(!this.points || this.points.length < 1) return
		ctx.strokeStyle = '#ff0000'
		ctx.beginPath()
		this.points.forEach((p) => ctx.lineTo(p[0], p[1]))
		ctx.lineTo(this.points[0][0], this.points[0][1])
		ctx.stroke()
	}
}