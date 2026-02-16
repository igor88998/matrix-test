import type { Cell, Matrix } from "../types.js";

function randomAmount(): number {
	return Math.floor(100 + Math.random() * 900);
}

export function generateMatrix(m: number, n: number, startId: number): Matrix {
	const matrix: Matrix = [];
	let id = startId;

	for (let i = 0; i < m; i++) {
		const row: Cell[] = [];
		for (let j = 0; j < n; j++) {
			row.push({ id: id++, amount: randomAmount() });
		}
		matrix.push(row);
	}

	return matrix;
}
