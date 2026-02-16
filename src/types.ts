export type CellId = number;
export type CellValue = number;

export type Cell = {
	id: CellId;
	amount: CellValue;
};

export type Matrix = Cell[][];

export type MatrixState = {
	matrix: Matrix;
	m: number;
	n: number;
	x: number;
	nextId: number;
};

export type MatrixAction =
	| { type: "INIT"; payload: { m: number; n: number; x: number } }
	| { type: "INCREMENT_CELL"; payload: { cellId: CellId } }
	| { type: "REMOVE_ROW"; payload: { rowIndex: number } }
	| { type: "ADD_ROW" };

export type HoverState =
	| {
			type: "cell";
			cellId: CellId;
			amount: CellValue;
	  }
	| {
			type: "sum";
			rowIndex: number;
	  }
	| null;
