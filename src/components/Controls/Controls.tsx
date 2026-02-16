import { useCallback, useState } from "react";
import { useMatrix } from "../../hooks/useMatrix.js";
import styles from "./Controls.module.css";

const M_MIN = 0;
const M_MAX = 100;
const N_MIN = 0;
const N_MAX = 100;

function getXMax(m: number, n: number): number {
	return Math.max(0, m * n);
}

export function Controls() {
	const { m, n, x, initMatrix, addRow, matrix } = useMatrix();
	const [inputM, setInputM] = useState(String(m || 3));
	const [inputN, setInputN] = useState(String(n || 3));
	const [inputX, setInputX] = useState(String(x || 5));
	const [error, setError] = useState("");

	const numM = Number(inputM);
	const numN = Number(inputN);
	const numX = Number(inputX);
	const xMax = getXMax(numM, numN);

	const handleGenerate = useCallback(() => {
		setError("");
		if (
			Number.isNaN(numM) ||
			numM < M_MIN ||
			numM > M_MAX ||
			!Number.isInteger(numM)
		) {
			setError(`M must be an integer between ${M_MIN} and ${M_MAX}`);
			return;
		}
		if (
			Number.isNaN(numN) ||
			numN < N_MIN ||
			numN > N_MAX ||
			!Number.isInteger(numN)
		) {
			setError(`N must be an integer between ${N_MIN} and ${N_MAX}`);
			return;
		}
		if (numM === 0 || numN === 0) {
			setError("M and N must be greater than 0 to generate a matrix");
			return;
		}
		const maxX = getXMax(numM, numN);
		if (
			Number.isNaN(numX) ||
			numX < 1 ||
			numX > maxX ||
			!Number.isInteger(numX)
		) {
			setError(`X must be an integer between 1 and ${maxX} (M×N)`);
			return;
		}
		initMatrix(numM, numN, numX);
	}, [numM, numN, numX, initMatrix]);

	const handleAddRow = useCallback(() => {
		if (matrix.length === 0) {
			setError("Generate a matrix first");
			return;
		}
		setError("");
		addRow();
	}, [matrix.length, addRow]);

	return (
		<div className={styles.controls}>
			<div className={styles.row}>
				<label className={styles.label}>
					M (rows, 0–100)
					<input
						type="number"
						min={M_MIN}
						max={M_MAX}
						value={inputM}
						onChange={(e) => setInputM(e.target.value)}
						className={styles.input}
					/>
				</label>
				<label className={styles.label}>
					N (columns, 0–100)
					<input
						type="number"
						min={N_MIN}
						max={N_MAX}
						value={inputN}
						onChange={(e) => setInputN(e.target.value)}
						className={styles.input}
					/>
				</label>
				<label className={styles.label}>
					X (nearest cells, 1–{xMax || "M×N"})
					<input
						type="number"
						min={1}
						max={xMax || 1}
						value={inputX}
						onChange={(e) => setInputX(e.target.value)}
						className={styles.input}
					/>
				</label>
				<button type="button" onClick={handleGenerate} className={styles.btn}>
					Generate matrix
				</button>
				<button
					type="button"
					onClick={handleAddRow}
					className={styles.btnSecondary}
					disabled={matrix.length === 0}
				>
					Add row
				</button>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
}
