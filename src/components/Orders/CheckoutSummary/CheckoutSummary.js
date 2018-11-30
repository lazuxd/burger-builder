import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <Burger ingredients={props.ingredients}/>
            <div className={classes.Buttons}>
                <Button type="Danger" onClick={props.cancel}>CANCEL</Button>
                <Button type="Success" onClick={props.continue}>CONTINUE</Button>
            </div>
        </div>
    );
};

export default CheckoutSummary;