export default class CanvasPoint {
	private x: number
	private y: number
	private r: number

	constructor(x, y, r) {
		this.x = x
		this.y = y
		this.r = r
	}

	xy() { return [this.x, this.y] }

	draw(ctx) {
		ctx.strokeStyle = '#aaa'
		ctx.moveTo(this.x, this.y)
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		ctx.stroke()
	}
}
