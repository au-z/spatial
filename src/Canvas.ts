export default (function Canvas() {
	function create(selector?: string) {
		let canvas
		if(selector) {
			canvas = document.querySelector(selector)
		} else {
			canvas = document.getElementsByTagName('canvas')?.[0]
		}

		const ctx = canvas.getContext('2d')

		window.addEventListener('resize', (e) => {
			resizeCanvas(ctx)
		})
		function resizeCanvas(ctx) {
			ctx.canvas.width = canvas.offsetWidth
			ctx.canvas.height = canvas.offsetHeight
		}

		resizeCanvas(ctx)

		return {
			canvas,
			ctx,
		}
	}

	return {
		create,
	}
})()