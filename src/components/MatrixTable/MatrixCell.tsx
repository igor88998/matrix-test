import { useCallback } from "react";
import { useMatrix } from "../../hooks/useMatrix.js";
import { percentOfTotal, ratioToMax } from "../../utils/calculations.js";
import type { Cell } from "../../types.js";
import styles from "./MatrixTable.module.css";

type MatrixCellProps = {
	cell: Cell;
	row: Cell[];
	sum: number;
	isSumHovered: boolean;
};

export function MatrixCell({ cell, row, sum, isSumHovered }: MatrixCellProps) {
	const { closestIds, incrementCell, setHoverState, hoverState } = useMatrix();

	const isClosest = closestIds.has(cell.id);
	const isHoveredCell =
		hoverState?.type === "cell" && hoverState.cellId === cell.id;

	const handleClick = useCallback(() => {
		incrementCell(cell.id);
	}, [incrementCell, cell.id]);

	const handleMouseEnter = useCallback(() => {
		setHoverState({ type: "cell", cellId: cell.id, amount: cell.amount });
	}, [setHoverState, cell.id, cell.amount]);

	const handleMouseLeave = useCallback(() => {
		setHoverState(null);
	}, [setHoverState]);

	const displayValue = isSumHovered
		? `${percentOfTotal(cell.amount, sum)}%`
		: cell.amount;

	const maxInRow = Math.max(...row.map((c) => c.amount), 0);
	const heatmapRatio = ratioToMax(cell.amount, maxInRow);

	const cellClassName = [
		styles.cell,
		isClosest && styles.cellClosest,
		isHoveredCell && styles.cellHovered,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<td
			className={cellClassName}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={
				isSumHovered
					? {
							background: `linear-gradient(to top, var(--heatmap-color) ${heatmapRatio * 100}%, transparent ${heatmapRatio * 100}%)`,
						}
					: undefined
			}
		>
			{displayValue}
		</td>
	);
}
