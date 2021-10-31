import { CellActionType } from '../action-types';
import {
    DeleteCellAction,
    Direction,
    InsertCellAfterAction,
    MoveCellAction,
    UpdateCellAction,
} from '../actions';
import { CellTypes } from '../cell';

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
