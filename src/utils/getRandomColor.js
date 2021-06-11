export class Color {
	/** @param {number} r  @param {number} g  @param {number} b  @param {number} a */
	constructor(r,g,b,a) {
		if ((a ?? 255) > 255 || (a ?? 255) < 0) a = 255

		for (const [key,value] of Object.entries({ red:r,green:g,blue:b }))
			if (value > 255 || value < 0) throw new Error(`${key} cannot be an value higher than 255 or less than 0`)
		
		this.r = r
		this.g = g
		this.b = b
		this.a = a ?? 255
	}

	getRGB() {
		return `rgba(${this.r}, ${this.g}, ${this.b})`
	}

	getRGBA() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
	}

	getHex() {
		const HEX = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

		const { r,g,b } = this

		const rf = Math.floor(r/16), rl = r%16
		const gf = Math.floor(g/16), gl = g%16
		const bf = Math.floor(b/16), bl = b%16

		const newR = HEX[rf]+HEX[rl]
		const newG = HEX[gf]+HEX[gl]
		const newB = HEX[bf]+HEX[bl]
		
		return `#${newR}${newG}${newB}`
	}

	getHexAlpha() {
		const HEX = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

		const { r,g,b,a } = this

		const newR = HEX[Math.floor(r/16)]+HEX[r%16]
		const newG = HEX[Math.floor(g/16)]+HEX[g%16]
		const newB = HEX[Math.floor(b/16)]+HEX[b%16]
		const newA = HEX[Math.floor(a/16)]+HEX[a%16]
		
		return `#${newR}${newG}${newB}${newA}`
	}

	/** @param {number} percentage must be an number between 0 and 1 represents how much you want to increase the brightness */
	getHigherBrightness(percentage) {
		const newR = Math.floor(Math.min(255, this.r * (1 + percentage * 0.299)))
		const newG = Math.floor(Math.min(255, this.g * (1 + percentage * 0.587)))
		const newB = Math.floor(Math.min(255, this.b * (1 + percentage * 0.114)))

		return new Color(newR,newG,newB,this.a)
	}
}

function getRandomColor() {
	const random8Bit = () => Math.floor(Math.random() * 256)

	const r = random8Bit()
	const g = random8Bit()
	const b = random8Bit()
	const a = random8Bit()

	return new Color(r,g,b,a)
}

export default getRandomColor