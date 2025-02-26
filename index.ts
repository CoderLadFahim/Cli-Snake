const readline = require('node:readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

enum ValidMoves {
    Left = 'a',
    Down = 's',
    Up = 'w',
    Right = 'd',
}

interface CoordinateType {
	x: number
	y: number
}

class InteractiveCanvas {
	public bgChar: string
	public mainChar: string
	public rowCount: number
	public columnCount: number

	private pointerCoords: CoordinateType
	private row: string[]
	private userInput: string
	private canvas: Array<string[]>

	constructor(columnCount: number = 6, rowCount: number = 10) {
		this.bgChar = '□'
		this.mainChar = '■'
		this.rowCount = rowCount
		this.columnCount = columnCount
		this.row = Array(columnCount).fill(this.bgChar)
		this.pointerCoords = {x: 0, y: 0}

		// rendering the canvas initially
		this.initializeNewCanvas()
		this.renderCanvas()
	}

	private getUserInput(): void {
		rl.question(`Enter move(W/S/A/D)): `, (userInput: string) => {
			this.userInput = userInput
			this.handleUserInput()
		})
	}

	private handleUserInput(): void {
		const showOutOfRangeError = () => {
			console.log('Out of range!')
			return this.getUserInput()
		}

		const xCoord = this.pointerCoords.x + 1
		const yCoord = this.pointerCoords.y + 1

		switch (this.userInput) {
			case ValidMoves.Left:
				if (xCoord === 1) return showOutOfRangeError()
				this.pointerCoords.x--
				break
			case ValidMoves.Down:
				if (yCoord === this.rowCount) return showOutOfRangeError()
				this.pointerCoords.y++
				break
			case ValidMoves.Up:
				if (yCoord === 1) return showOutOfRangeError()
				this.pointerCoords.y--
				break
			case ValidMoves.Right:
				if (xCoord === this.columnCount)
					return showOutOfRangeError()
				this.pointerCoords.x++
				break
			default:
				console.log('Invalid move!')
				return this.getUserInput()
		}

		this.renderCanvas()
		this.printCanvas()
	}

	private renderCanvas(): void {
		this.initializeNewCanvas()
		this.canvas[this.pointerCoords.y][this.pointerCoords.x] =
			this.mainChar
	}

	private printCanvas(): void {
		console.log(this.canvas)
		this.getUserInput()
	}

	private initializeNewCanvas() {
		this.canvas = Array(this.rowCount)
			.fill(null)
			.map(() => [...this.row])
	}

	public startGame(): void {
		this.printCanvas()
		this.getUserInput()
	}
}

const interactiveCanvasInstance = new InteractiveCanvas()

interactiveCanvasInstance.startGame()
