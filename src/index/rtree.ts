import CanvasPoint from "../CanvasPoint";

interface Range2D {
	left: number,
	top: number,
	width: number,
	height: number,
}

const inbounds = (p: CanvasPoint, r: Range2D) =>
	(r.left <= p.x && p.x <= r.left + r.width) && (r.top <= p.y && p.y <= r.top + r.height)

export default class Node {
	public children: Node[];
	public range: Range2D;
	public data: CanvasPoint[];

	constructor(range: Range2D, data: CanvasPoint[] = []) {
		this.range = range
		this.data = data
	}

	partition() {
		this.data = this.data.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y)
		let c01 = this.data[2].x + (this.data[3].x - this.data[2].x) / 2
		let c12 = this.data[5].x + (this.data[6].x - this.data[5].x) / 2

		const c0 = [this.data[0], this.data[1], this.data[2]].sort((a, b) => a.y - b.y)
		const c1 = [this.data[3], this.data[4], this.data[5]].sort((a, b) => a.y - b.y)
		const c2 = [this.data[6], this.data[7], this.data[8]].sort((a, b) => a.y - b.y)

		const c0r01 = c0[0].y + (c0[1].y - c0[0].y) / 2
		const c0r12 = c0[1].y + (c0[2].y - c0[1].y) / 2
		const c1r01 = c1[0].y + (c1[1].y - c1[0].y) / 2
		const c1r12 = c1[1].y + (c1[2].y - c1[1].y) / 2
		const c2r01 = c2[0].y + (c2[1].y - c2[0].y) / 2
		const c2r12 = c2[1].y + (c2[2].y - c2[1].y) / 2

		const top = this.range.top
		const right = this.range.left + this.range.width
		const bottom = this.range.top + this.range.height
		const left = this.range.left

		this.children = [
			// col 0
			new Node({left: left, top: top, width: c01 - left, height: c0r01 - top}, [c0[0]]),
			new Node({left: left, top: c0r01, width: c01 - left, height: c0r12 - c0r01}, [c0[1]]),
			new Node({left: left, top: c0r12, width: c01 - left, height: bottom - c0r12}, [c0[2]]),
			// col 1
			new Node({left: c01, top: top, width: c12 - c01, height: c1r01 - top}, [c1[0]]),
			new Node({left: c01, top: c1r01, width: c12 - c01, height: c1r12 - c1r01}, [c1[1]]),
			new Node({left: c01, top: c1r12, width: c12 - c01, height: bottom - c1r12}, [c1[2]]),
			// col 2
			new Node({left: c12, top: top, width: right - c12, height: c2r01 - top}, [c2[0]]),
			new Node({left: c12, top: c2r01, width: right - c12, height: c2r12 - c2r01}, [c2[1]]),
			new Node({left: c12, top: c2r12, width: right - c12, height: bottom - c2r12}, [c2[2]]),
		]
		this.data = []
	}

	insert(p: CanvasPoint) {
		if(this.data.length === 9) {
			this.partition()
		}

		if(this.children) {
			this.children.forEach((c) => inbounds(p, c.range) && c.insert(p))
		} else {
			this.data.push(p)
		}
	}

	drawRange(ctx) {
		ctx.strokeStyle = '#444444'
		ctx.beginPath()
		ctx.rect(this.range.left, this.range.top, this.range.width, this.range.height)
		ctx.stroke()
	}

	draw(ctx) {
		this.drawRange(ctx)
		this.children?.forEach((c) => c.draw(ctx))
	}
}