import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import authReducer from './auth';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    auth: authReducer
});

export default rootReducer;