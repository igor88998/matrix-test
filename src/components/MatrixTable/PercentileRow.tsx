import styles from "./MatrixTable.module.css";

type PercentileRowProps = {
	values: number[];
};

export function PercentileRow({ values }: PercentileRowProps) {
	return (
		<tr className={styles.percentileRow}>
			{values.map((val, i) => (
				<td key={i} className={styles.percentileCell}>
					{typeof val === "number" ? val.toFixed(1) : val}
				</td>
			))}
			<td className={styles.percentileLabel} colSpan={2}>
				60th percentile
			</td>
		</tr>
	);
}
