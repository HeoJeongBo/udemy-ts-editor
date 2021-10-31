import { Dispatch } from 'redux';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';

import bundle from '../../bundler';

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<BundleAction>) => {
        dispatch({
            type: BundleActionType.BUNDLE_START,
            payload: {
                cellId,
            },
        });

        const result = await bundle(input);

        dispatch({
            type: BundleActionType.BUNDLE_COMPLETE,
            payload: {
                cellId: cellId,
                bundle: result,
            },
        });
    };
};
