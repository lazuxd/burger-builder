import { updateObject } from '../../tools/functions';
import * as actions from '../actions/auth';

const initialState = {
    id: null,
    email: null,
    token: null,
    expiresIn: null,
    wait: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SIGNUP_START:
            return updateObject(state, {wait: true});
        case actions.SIGNUP_SUCCESS:
            return updateObject(state, {
                id: action.authData.localId,
                email: action.authData.email,
                token: action.authData.idToken,
                expiresIn: action.authData.expiresIn,
                wait: false,
                error: null
            });
        case actions.SIGNUP_FAIL:
            return updateObject(state, {wait: false, error: action.error});
        case actions.SIGNIN_START:
            return updateObject(state, {wait: true});
        case actions.SIGNIN_SUCCESS:
            return updateObject(state, {
                id: action.authData.localId,
                email: action.authData.email,
                token: action.authData.idToken,
                expiresIn: action.authData.expiresIn,
                wait: false,
                error: null
            });
        case actions.SIGNIN_FAIL:
            return updateObject(state, {wait: false, error: action.error});
        default:
            return state;
    }
};

export default authReducer;