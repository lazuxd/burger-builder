import React from 'react';

import classes from './BurgerControl.module.css';

const BurgerControl = props => (
    <div className={classes.BurgerControl}>
        <div className={classes.Label}>{(props.label)}</div>
        <button
            className={classes.Less}
            onClick={props.lessIngredient.bind(null, props.type)}
            disabled={props.count === 0}
        >
            Less
        </button>
        <button
            className={classes.More}
            onClick={props.moreIngredient.bind(null, props.type)}
        >
            More
        </button>
    </div>
)

export default BurgerControl;