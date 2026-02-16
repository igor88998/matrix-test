import { useCallback, useMemo } from "react";
import { useMatrixContext } from "../app/MatrixProvider.js";
import { rowSums } from "../utils/calculations.js";
import { findClosestCellIds } from "../utils/findClosest.js";
import { columnPercentiles60 } from "../utils/percentile.js";

export function useMatrix() {
	const { state, dispatch, hoverState, setHoverState } = useMatrixContext();
	const { matrix, m, n, x } = state;

	const sums = useMemo(() => rowSums(matrix), [matrix]);
	const percentileRow = useMemo(() => columnPercentiles60(matrix), [matrix]);

	const closestIds = useMemo(() => {
		if (hoverState?.type !== "cell" || x <= 0) return new Set<number>();
		return findClosestCellIds(matrix, hoverState.amount, hoverState.cellId, x);
	}, [matrix, hoverState, x]);

	const initMatrix = useCallback(
		(newM: number, newN: number, newX: number) => {
			dispatch({ type: "INIT", payload: { m: newM, n: newN, x: newX } });
		},
		[dispatch],
	);

	const incrementCell = useCallback(
		(cellId: number) => {
			dispatch({ type: "INCREMENT_CELL", payload: { cellId } });
		},
		[dispatch],
	);

	const removeRow = useCallback(
		(rowIndex: number) => {
			dispatch({ type: "REMOVE_ROW", payload: { rowIndex } });
		},
		[dispatch],
	);

	const addRow = useCallback(() => {
		dispatch({ type: "ADD_ROW" });
	}, [dispatch]);

	return {
		matrix,
		m,
		n,
		x,
		sums,
		percentileRow,
		closestIds,
		hoverState,
		setHoverState,
		initMatrix,
		incrementCell,
		removeRow,
		addRow,
	};
}
