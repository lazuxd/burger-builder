import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from '../../axios-orders';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactInfo from '../ContactInfo/ContactInfo';
import classes from './Checkout.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

import * as actions from '../../redux/actions';

class Checkout extends React.Component {
    state = {
        sendingOrder: false
    }
    makeOrder = (orderInfo) => {
        this.setState({sendingOrder: true});
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ingredients,
            totalPrice: this.props.burgerPrice,
            orderInfo
        };
        axios.post('orders.json?auth='+this.props.token, order)
            .then(response => {
                this.setState({sendingOrder: false});
                this.props.history.replace('/');
                this.props.reloadIngredients();
                this.props.stopBuying();
            })
            .catch(error => {
                this.setState({sendingOrder: false});
            });
    }
    render() {
        let comp = props => <ContactInfo order={this.makeOrder} />;
        if (this.state.sendingOrder) {
            comp = props => <Spinner />;
        }
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancel={() => {this.props.history.replace('/');}}
                    continue={() => {this.props.history.replace('/checkout/contact-info');}}
                />
                <Route
                    path={'/checkout/contact-info'}
                    render={comp}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients.quantity,
    burgerPrice: state.ingredients.burgerPrice,
    userId: state.auth.id,
    token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    reloadIngredients: () => dispatch(actions.loadIngredients()),
    stopBuying: () => dispatch(actions.stopBuying())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandling(withRouter(Checkout), axios));