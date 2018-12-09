import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from '../../axios-orders';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactInfo from '../ContactInfo/ContactInfo';
import classes from './Checkout.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class Checkout extends React.Component {
    state = {
        sendingOrder: false
    }
    makeOrder = (orderInfo) => {
        this.setState({sendingOrder: true});
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.burgerPrice,
            orderInfo
        };
        axios.post('orders.json', order)
            .then(response => {
                this.setState({sendingOrder: false});
                this.props.history.replace('/');
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
    burgerPrice: state.ingredients.burgerPrice
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandling(withRouter(Checkout), axios));