import React from 'react';

import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

import { capitalize } from '../../tools/functions';

const BurgerControls = props => {
    const canPurchase = Object.values(props.ingredients).reduce((sum, el) => sum+el, 0) > 0;
    return (
        <div className={classes.BurgerControls}>
            <p>Current Price: <strong>${props.burgerPrice.toFixed(2)}</strong></p>
            {
                Object.keys(props.ingredients).map((cntr, i) => (
                    <BurgerControl
                        key={cntr}
                        label={capitalize(cntr)}
                        type={cntr}
                        count={props.ingredients[cntr]}
                        lessIngredient={props.lessIngredient}
                        moreIngredient={props.moreIngredient}
                    />
                ))
            }
            <button
                disabled={!canPurchase}
                className={classes.OrderButton}
                onClick={props.purchase.bind(null, true)}
            >
                ORDER NOW
            </button>
        </div>
    );
}

export default BurgerControls;