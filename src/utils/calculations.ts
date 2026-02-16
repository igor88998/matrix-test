import type { Matrix } from "../types.js";

export function rowSum(row: { amount: number }[]): number {
	return row.reduce((acc, cell) => acc + cell.amount, 0);
}

export function rowSums(matrix: Matrix): number[] {
	return matrix.map((row) => rowSum(row));
}

export function percentOfTotal(value: number, total: number): number {
	if (total === 0) return 0;
	return Math.round((value / total) * 100);
}

export function ratioToMax(value: number, max: number): number {
	if (max === 0) return 0;
	return value / max;
}
