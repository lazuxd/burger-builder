import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from '../../axios-orders';

import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactInfo from '../ContactInfo/ContactInfo';
import classes from './Checkout.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class Checkout extends React.Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        burgerPrice: 0,
        sendingOrder: false
    }
    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let burgerPrice = 0;
        for (let param of params) {
            if (param[0] === 'burgerPrice') {
                burgerPrice = param[1];
                continue;
            }
            ingredients[param[0]] = parseInt(param[1]);
        }
        this.setState({ingredients, burgerPrice});
    }
    makeOrder = (orderInfo) => {
        this.setState({sendingOrder: true});
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.burgerPrice,
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
                    ingredients={this.state.ingredients}
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

export default withErrorHandling(withRouter(Checkout), axios);