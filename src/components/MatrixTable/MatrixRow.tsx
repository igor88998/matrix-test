import { useCallback } from "react";
import { useMatrix } from "../../hooks/useMatrix.js";
import { MatrixCell } from "./MatrixCell.js";
import type { Cell } from "../../types.js";
import styles from "./MatrixTable.module.css";

type MatrixRowProps = {
	row: Cell[];
	rowIndex: number;
	sum: number;
};

export function MatrixRow({ row, rowIndex, sum }: MatrixRowProps) {
	const { hoverState, setHoverState, removeRow } = useMatrix();
	const isSumHovered =
		hoverState?.type === "sum" && hoverState.rowIndex === rowIndex;

	const handleSumMouseEnter = useCallback(() => {
		setHoverState({ type: "sum", rowIndex });
	}, [setHoverState, rowIndex]);

	const handleSumMouseLeave = useCallback(() => {
		setHoverState(null);
	}, [setHoverState]);

	const handleRemove = useCallback(() => {
		removeRow(rowIndex);
	}, [removeRow, rowIndex]);

	return (
		<tr className={styles.row}>
			{row.map((cell) => (
				<MatrixCell
					key={cell.id}
					cell={cell}
					row={row}
					sum={sum}
					isSumHovered={isSumHovered}
				/>
			))}
			<td
				className={`${styles.sumCell} ${isSumHovered ? styles.sumCellHovered : ""}`}
				onMouseEnter={handleSumMouseEnter}
				onMouseLeave={handleSumMouseLeave}
				title="Hover to see row percentages and heatmap"
			>
				{sum}
			</td>
			<td className={styles.actionsCell}>
				<button
					type="button"
					className={styles.removeBtn}
					onClick={handleRemove}
					title="Remove row"
				>
					✕
				</button>
			</td>
		</tr>
	);
}
