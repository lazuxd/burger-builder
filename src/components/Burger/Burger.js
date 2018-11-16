import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
    let transfIngredients = Object.keys(props.ingredients)
        .map((ingKey) => (
            [...Array(props.ingredients[ingKey])].map((_, i) => <BurgerIngredient key={ingKey+i} type={ingKey} />)
        ))
        .reduce((arr, el) => (arr.concat(el)), []);
    if (transfIngredients.length === 0) {
        transfIngredients = <p>Please start adding ingredients.</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

Burger.propTypes = {
    ingredients: PropTypes.shape({
        meal: PropTypes.number,
        cheese: PropTypes.number,
        salad: PropTypes.number,
        bacon: PropTypes.number
    }).isRequired
};

export default Burger;