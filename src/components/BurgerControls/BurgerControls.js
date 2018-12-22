import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';
import * as actions from '../../redux/actions';

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
                onClick={() => {
                    if (props.isAuthenticate) {
                        props.purchase(true);
                    } else {
                        props.startBuying();
                        props.history.push('/authenticate');
                    }
                }}
            >
                {props.isAuthenticate ? '' : 'SIGNUP TO '}ORDER NOW
            </button>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticate: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    startBuying: () => dispatch(actions.startBuying())
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BurgerControls));