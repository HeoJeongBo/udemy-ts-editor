import { Dispatch } from 'redux';
import { CellAction, BundleAction } from '../actions';
import { CellActionType } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '..';

type Action = CellAction | BundleAction;

export const persistMiddleware = ({
    dispatch,
    getState,
}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState;
}) => {
    let timer: any;

    return (next: (action: Action) => any) => {
        return (action: Action) => {
            next(action);

            if (
                [
                    CellActionType.MOVE_CELL,
                    CellActionType.UPDATE_CELL,
                    CellActionType.INSERT_CELL_AFTER,
                    CellActionType.DELETE_CELL,
                ].includes(action.type as CellActionType)
            ) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState);
                }, 400);
            }
        };
    };
};
