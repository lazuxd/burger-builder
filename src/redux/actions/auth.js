import axios from 'axios';


export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const SIGNIN_START = "SIGNIN_START";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";


const apiKey = 'AIzaSyAJG_L9hS1S5Iq5C85m6qFihqYkLrfETJc';

export const signup = (email, password) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+apiKey, {email, password, returnSecureToken: true})
        .then(response => {
            dispatch(signupSuccess(response));
        })
        .catch(error => {
            dispatch(signupFail(error));
        });
    };
};

export const signupStart = () => {
    return {
        type: SIGNUP_START
    };
};

export const signupSuccess = (authData) => {
    return {
        type: SIGNUP_SUCCESS,
        authData
    };
};

export const signupFail = (error) => {
    return {
        type: SIGNUP_FAIL,
        error
    };
};

export const signin = (email, password) => {
    return dispatch => {
        dispatch(signinStart());
        axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+apiKey, {email, password, returnSecureToken: true})
        .then(response => {
            dispatch(signinSuccess(response.data));
        })
        .catch(error => {
            dispatch(signinFail(error.response.data.error.message));
        });
    };
};

export const signinStart = () => {
    return {
        type: SIGNIN_START
    };
};

export const signinSuccess = (authData) => {
    return {
        type: SIGNIN_SUCCESS,
        authData
    };
};

export const signinFail = (error) => {
    return {
        type: SIGNIN_FAIL,
        error
    };
};
