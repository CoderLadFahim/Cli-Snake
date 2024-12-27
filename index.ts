const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bgChar = '□';
const mainChar = '■';

const rowCount: number = 6;
const columnCount: number = 10;

const row: string[] = Array(rowCount).fill(bgChar);
const canvas: Array<string[]> = Array(columnCount).fill(null).map(() => [...row]);


const pointerCoords: {[key: string]: number} = {
    x: 1,
    y: 1
}

canvas[pointerCoords.x][pointerCoords.y] = mainChar;

type PlayerInputType = 'h' | 'j' | 'k' | 'l';

// const handlePlayerInput = (playerInput: PlayerInputType) => {
//     const acceptableInputTypes: PlayerInputType[] = ['h', 'j', 'k', 'l'];
//     if (!acceptableInputTypes.includes(playerInput))
//         return 'Invalid input bitch!';
// }

rl.question(`Which way to go bitch?:  `, playerInput => {
    console.log(canvas);
    console.log(`Going: ${ playerInput }`);
});
