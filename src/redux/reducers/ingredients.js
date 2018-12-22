import * as actions from '../actions/ingredients';

const INGREDIENT_PRICES = {
    meat: 1.2,
    cheese: 0.8,
    salad: 0.5,
    bacon: 1
};

const initialState = {
    quantity: null,
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
        case actions.SET_INGREDIENTS:
            const ing = {
                ...state.quantity,
                ...action.ingredients
            };
            return {
                quantity: ing,
                burgerPrice: Object.entries(ing).reduce((total, entrie) => {
                    total += entrie[1] * INGREDIENT_PRICES[entrie[0]];
                    return total;
                }, 4)
            };
        default:
            return state;
    }
};

export default ingredientsReducer;