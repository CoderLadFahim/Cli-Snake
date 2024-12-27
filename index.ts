const readline = require('node:readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

type ValidMove = 'h' | 'j' | 'k' | 'l'

class InteractiveCanvas {
	public bgChar: string
	public mainChar: string
	public rowCount: number
	public columnCount: number
	private pointerCoords: {[key: string]: number}
	private row: string[]
	private canvas: Array<string[]>
	private userInput: ValidMove

	constructor(
		pointerCoords: {[key: string]: number},
		rowCount: number = 6,
		columnCount: number = 10
	) {
		this.bgChar = '□'
		this.mainChar = '■'
		this.rowCount = rowCount
		this.columnCount = columnCount
		this.pointerCoords = pointerCoords
		this.row = Array(rowCount).fill(this.bgChar)
		this.canvas = Array(columnCount)
			.fill(null)
			.map(() => [...this.row])

		this.canvas[this.pointerCoords.x][this.pointerCoords.y] =
			this.mainChar
	}

	private getUserInput() {
		rl.question(`Enter move: `, (userInput: ValidMove) => {
			const validMoves: ValidMove[] = ['h', 'j', 'k', 'l'];

			if (!validMoves.includes(userInput)) {
			    console.log('Invalid move!');
			    return this.getUserInput();
			}

			this.handleValidUserInput();

			rl.close();
		})
	}

	private handleValidUserInput() {
        console.log('that was a valid move!');
	}

	private renderCanvas(): void {
		console.log(this.canvas)
	}

	public startGame() {
		this.getUserInput()
	}
}

const interactiveCanvasInstance = new InteractiveCanvas({x: 1, y: 2})

interactiveCanvasInstance.startGame()
