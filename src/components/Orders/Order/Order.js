import React from 'react';

import classes from './Order.module.css';

const Order = props => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: 
                {
                    Object.keys(props.ingredients).map(ing => (
                        <span key={ing}>{ ing + ' (' + props.ingredients[ing] + ')' }</span>
                    ))
                }
            </p>
            <p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;