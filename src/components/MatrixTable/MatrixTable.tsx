import { useMatrix } from "../../hooks/useMatrix.js";
import { MatrixRow } from "./MatrixRow.js";
import { PercentileRow } from "./PercentileRow.js";
import styles from "./MatrixTable.module.css";

export function MatrixTable() {
	const { matrix, sums, percentileRow } = useMatrix();

	if (matrix.length === 0) {
		return (
			<p className={styles.empty}>
				Enter M, N, X and click &quot;Generate matrix&quot;
			</p>
		);
	}

	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<tbody>
					{matrix.map((row, i) => (
						<MatrixRow
							key={row[0]?.id ?? i}
							row={row}
							rowIndex={i}
							sum={sums[i] ?? 0}
						/>
					))}
					<PercentileRow values={percentileRow} />
				</tbody>
			</table>
		</div>
	);
}
