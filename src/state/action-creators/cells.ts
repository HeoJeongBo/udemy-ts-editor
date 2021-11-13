import axios from 'axios';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { CellActionType } from '../action-types';
import {
    DeleteCellAction,
    Direction,
    InsertCellAfterAction,
    MoveCellAction,
    UpdateCellAction,
    CellAction,
} from '../actions';
import { CellTypes, Cell } from '../cell';

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: CellActionType.UPDATE_CELL,
        payload: {
            id,
            content,
        },
    };
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: CellActionType.DELETE_CELL,
        payload: {
            id,
        },
    };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: CellActionType.MOVE_CELL,
        payload: {
            id,
            direction,
        },
    };
};

export const insertCellAfter = (
    id: string | null,
    cellType: CellTypes
): InsertCellAfterAction => {
    return {
        type: CellActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellType,
        },
    };
};

export const fetchCells = () => {
    return async (dispatch: Dispatch<CellAction>) => {
        dispatch({
            type: CellActionType.FETCH_CELLS,
        });

        try {
            const { data }: { data: Cell[] } = await axios.get('/cells');

            dispatch({
                type: CellActionType.FETCH_CELLS_COMPLETE,
                payload: data,
            });
        } catch (err: any) {
            dispatch({
                type: CellActionType.FETCH_CELLS_ERROR,
                payload: err.message,
            });
        }
    };
};

export const saveCells = () => {
    return async (
        dispatch: Dispatch<CellAction>,
        getState: () => RootState
    ) => {
        const {
            cells: { data, order },
        } = getState();

        const cells = order.map((id) => data[id]);

        try {
            await axios.post('/cells', { cells });
        } catch (err: any) {
            dispatch({
                type: CellActionType.SAVE_CELLS_ERROR,
                payload: err.message,
            });
        }
    };
};
