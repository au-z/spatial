const cross = (a, b, c) => (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0])


export function monotoneChain(points: [number, number][]) {
	points = points.sort((a, b) => (a[0] !== b[0]) ? a[0] - b[0] : a[1] - b[1])

	const L = []
	for(let i = 0; i < points.length; ++i) {
		while(L.length >= 2 && cross(L[L.length - 2], L[L.length - 1], points[i]) <= 0) {
			L.pop()
		}
		L.push(points[i])
	}

	const U = []
	for(let i = points.length - 1; i >= 0; --i) {
		while(U.length >= 2 && cross(U[U.length - 2], U[U.length - 1], points[i]) <= 0) {
			U.pop()
		}
		U.push(points[i])
	}

	U.pop()
	L.pop()
	return L.concat(U)
}

export function gaussArea(points: [number, number][]) {
	points.push(points[0])
	let lr = 0
	let rl = 0
	for(let i = 1; i < points.length; ++i) {
		lr += points[i][1] * points[i - 1][0]
		rl += points[i][0] * points[i - 1][1]
	}
	console.log(lr, rl)

	points.pop()
	return (lr - rl) / 2.0
}