import { combineReducers } from 'redux';

import ingredientsReducer from './reducers/ingredientsReducer';

const reducer = combineReducers({
    ingredients: ingredientsReducer
});

export default reducer;