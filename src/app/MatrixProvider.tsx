import {
	createContext,
	useContext,
	useMemo,
	useReducer,
	useState,
	type ReactNode,
} from "react";
import { generateMatrix } from "../utils/generateMatrix.js";
import type { MatrixState, MatrixAction, HoverState } from "../types.js";

const initialState: MatrixState = {
	matrix: [],
	m: 0,
	n: 0,
	x: 0,
	nextId: 1,
};

function matrixReducer(state: MatrixState, action: MatrixAction): MatrixState {
	switch (action.type) {
		case "INIT": {
			const { m, n, x } = action.payload;
			const matrix = generateMatrix(m, n, state.nextId);
			return {
				...state,
				matrix,
				m,
				n,
				x,
				nextId: state.nextId + m * n,
			};
		}
		case "INCREMENT_CELL": {
			const { cellId } = action.payload;
			const matrix = state.matrix.map((row) =>
				row.map((cell) =>
					cell.id === cellId ? { ...cell, amount: cell.amount + 1 } : cell,
				),
			);
			return { ...state, matrix };
		}
		case "REMOVE_ROW": {
			const { rowIndex } = action.payload;
			const matrix = state.matrix.filter((_, i) => i !== rowIndex);
			return { ...state, matrix, m: Math.max(0, state.m - 1) };
		}
		case "ADD_ROW": {
			const newRow = generateMatrix(1, state.n, state.nextId)[0]!;
			const matrix = [...state.matrix, newRow];
			return {
				...state,
				matrix,
				m: state.m + 1,
				nextId: state.nextId + state.n,
			};
		}
		default:
			return state;
	}
}

type MatrixContextValue = {
	state: MatrixState;
	dispatch: React.Dispatch<MatrixAction>;
	hoverState: HoverState;
	setHoverState: (hover: HoverState) => void;
};

const MatrixContext = createContext<MatrixContextValue | null>(null);

export function MatrixProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(matrixReducer, initialState);
	const [hoverState, setHoverState] = useState<HoverState>(null);

	const value = useMemo<MatrixContextValue>(
		() => ({ state, dispatch, hoverState, setHoverState }),
		[state, hoverState],
	);

	return (
		<MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
	);
}

export function useMatrixContext(): MatrixContextValue {
	const ctx = useContext(MatrixContext);
	if (!ctx)
		throw new Error("useMatrixContext must be used within MatrixProvider");
	return ctx;
}
