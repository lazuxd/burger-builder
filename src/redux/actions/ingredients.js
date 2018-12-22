import axios from '../../axios-orders';

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const SET_INGREDIENTS = "SET_INGREDIENTS";

export const addIngredient = ingredient => {
    return {
        type: ADD_INGREDIENT,
        ingredient
    };
};

export const removeIngredient = ingredient => {
    return {
        type: REMOVE_INGREDIENT,
        ingredient
    };
};

export const setIngredient = ingredients => {
    return {
        type: SET_INGREDIENTS,
        ingredients
    };
};

export const loadIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(error => {
            });
    };
};