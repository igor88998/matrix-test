import type { Cell } from "../types.js";

export function flattenCells(
	matrix: Cell[][],
): { id: number; amount: number }[] {
	const out: { id: number; amount: number }[] = [];
	for (const row of matrix) {
		for (const cell of row) {
			out.push({ id: cell.id, amount: cell.amount });
		}
	}
	return out;
}

export function findClosestCellIds(
	matrix: Cell[][],
	targetAmount: number,
	_excludeCellId: number,
	x: number,
): Set<number> {
	const cells = flattenCells(matrix);
	if (cells.length === 0 || x <= 0) return new Set();

	const withDistance = cells.map((c) => ({
		id: c.id,
		distance: Math.abs(c.amount - targetAmount),
	}));

	withDistance.sort((a, b) => a.distance - b.distance);

	const count = Math.min(x, withDistance.length);
	const result = new Set<number>();
	for (let i = 0; i < count; i++) {
		result.add(withDistance[i]!.id);
	}
	return result;
}
