import produce from 'immer';
import { BundleActionType } from '../action-types';
import { BundleAction } from '../actions';

interface BundlesState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              err: string;
          }
        | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
    (
        state: BundlesState = initialState,
        action: BundleAction
    ): BundlesState => {
        switch (action.type) {
            case BundleActionType.BUNDLE_START:
                state[action.payload.cellId] = {
                    loading: true,
                    code: '',
                    err: '',
                };
                return state;
            case BundleActionType.BUNDLE_COMPLETE:
                state[action.payload.cellId] = {
                    loading: false,
                    code: action.payload.bundle.code,
                    err: action.payload.bundle.err,
                };
                return state;
            default:
                return state;
        }
    },
    initialState
);

export default reducer;
