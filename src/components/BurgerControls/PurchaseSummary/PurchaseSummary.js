import React from 'react';

import { capitalize } from '../../../tools/functions';
import Button from '../../UI/Button/Button';

const PurchaseSummary = props => (
    <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {
                Object.keys(props.ingredients).map(ingKey => (
                    <li key={ingKey}>{capitalize(ingKey)}: {props.ingredients[ingKey]}</li>
                ))
            }
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" onClick={props.cancel}>CANCEL</Button>
        <Button type="Success" onClick={props.order}>CONTINUE</Button>
    </>
)

export default PurchaseSummary;