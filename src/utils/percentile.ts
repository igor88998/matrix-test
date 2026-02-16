export function percentile(sortedValues: number[], p: number): number {
	if (sortedValues.length === 0) return 0;
	if (sortedValues.length === 1) return sortedValues[0]!;

	const index = (p / 100) * (sortedValues.length - 1);
	const lower = Math.floor(index);
	const upper = Math.ceil(index);
	const weight = index - lower;

	const a = sortedValues[lower] ?? 0;
	const b = sortedValues[upper] ?? a;

	return a + weight * (b - a);
}

export function columnPercentiles60(matrix: { amount: number }[][]): number[] {
	if (matrix.length === 0) return [];

	const numCols = matrix[0]?.length ?? 0;
	const result: number[] = [];

	for (let j = 0; j < numCols; j++) {
		const column = matrix
			.map((row) => row[j]?.amount ?? 0)
			.filter((v) => v !== undefined);
		const sorted = [...column].sort((a, b) => a - b);
		result.push(percentile(sorted, 60));
	}

	return result;
}
