import { Map } from 'rot-js'
import Player from './Player'

class World {
	constructor(width, height, tilesize) {
		this.width = width
		this.height = height
		this.tilesize = tilesize
		this.entities = [new Player(0, 0, 16)]
		this.worldmap = new Array(this.width)

		for (let i = 0; i < width; i++) {
			this.worldmap[i] = new Array(this.height)
		}
	}

	createCellularMap() {
		let map = new Map.Cellular(this.width, this.height, { connected: true })
		map.randomize(0.5)

		let userCallback = (x, y, value) => {
			if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
				this.worldmap[x][y] = 1
				return
			}
			this.worldmap[x][y] = value === 1 ? 0 : 1
		}

		map.create(userCallback)
		map.connect(userCallback, 1)
	}

	get player() {
		return this.entities[0]
	}

	movePlayer(dx, dy) {
		this.player.move(dx, dy)
	}

	draw(context) {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				if (this.worldmap[i][j] === 1) {
					this.drawWall(i, j, context)
				}
			}
		}

		this.entities.forEach(entity => {
			entity.draw(context)
		})
	}

	drawWall(x, y, context) {
		context.fillStyle = '#000'
		context.fillRect(x * this.tilesize, y * this.tilesize, this.tilesize, this.tilesize)
	}
}

export default World
