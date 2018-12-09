import * as actions from '../actions';

const INGREDIENT_PRICES = {
    meat: 1.2,
    cheese: 0.8,
    salad: 0.5,
    bacon: 1
};

const initialState = {
    quantity: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    burgerPrice: 4
};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                quantity: {
                    ...state.quantity,
                    [action.ingredient]: state.quantity[action.ingredient] + 1
                },
                burgerPrice: state.burgerPrice + INGREDIENT_PRICES[action.ingredient]
            };
        case actions.REMOVE_INGREDIENT:
            return {
                quantity: {
                    ...state.quantity,
                    [action.ingredient]: state.quantity[action.ingredient] - 1
                },
                burgerPrice: state.burgerPrice - INGREDIENT_PRICES[action.ingredient]
            };
        default:
            return state;
    }
};

export default ingredientsReducer;