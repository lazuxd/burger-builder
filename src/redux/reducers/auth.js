import { updateObject } from '../../tools/functions';
import * as actions from '../actions/auth';

const initialState = {
    id: null,
    email: null,
    token: null,
    expiresIn: null,
    wait: false,
    error: null,
    isBuying: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_AUTH:
            return updateObject(state, action.authData);
        case actions.SIGNUP_START:
            return updateObject(state, {wait: true});
        case actions.SIGNUP_SUCCESS:
            {
                const authInfo = {
                    id: action.authData.localId,
                    email: action.authData.email,
                    token: action.authData.idToken,
                    expiresIn: action.authData.expiresIn,
                    wait: false,
                    error: null
                };
                sessionStorage.setItem('authInfo', JSON.stringify(authInfo));
                return updateObject(state, authInfo);
            }
        case actions.SIGNUP_FAIL:
            return updateObject(state, {wait: false, error: action.error});
        case actions.SIGNIN_START:
            return updateObject(state, {wait: true});
        case actions.SIGNIN_SUCCESS:
            {
                const authInfo = {
                    id: action.authData.localId,
                    email: action.authData.email,
                    token: action.authData.idToken,
                    expiresIn: action.authData.expiresIn,
                    wait: false,
                    error: null
                };
                sessionStorage.setItem('authInfo', JSON.stringify(authInfo));
                return updateObject(state, authInfo);
            }
        case actions.SIGNIN_FAIL:
            return updateObject(state, {wait: false, error: action.error});
        case actions.LOGOUT:
            return updateObject(initialState, {});
        case actions.START_BUYING:
            return updateObject(state, {isBuying: true});
        case actions.STOP_BUYING:
            return updateObject(state, {isBuying: false});
        default:
            return state;
    }
};

export default authReducer;