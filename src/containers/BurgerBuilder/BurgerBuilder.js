import React from 'react';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import PurchaseSummary from '../../components/BurgerControls/PurchaseSummary/PurchaseSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

const INGREDIENT_PRICES = {
    meat: 1.2,
    cheese: 0.8,
    salad: 0.5,
    bacon: 1
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        burgerPrice: 4,
        purchasing: false,
        sendingOrder: false,
        error: false
    }
    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }
    lessIngredient = (type) => {
        this.setState(prevState => {
            const nextState = {
                ingredients: {...prevState.ingredients},
                burgerPrice: prevState.burgerPrice - INGREDIENT_PRICES[type]
            };
            nextState.ingredients[type] = prevState.ingredients[type] > 0 ? prevState.ingredients[type]-1 : 0;
            return nextState;
        });
    }
    moreIngredient = (type) => {
        this.setState(prevState => {
            const nextState = {
                ingredients: {...prevState.ingredients},
                burgerPrice: prevState.burgerPrice + INGREDIENT_PRICES[type]
            };
            nextState.ingredients[type] = prevState.ingredients[type]+1;
            return nextState;
        });
    }
    purchase = (isPurchasing) => {
        this.setState({purchasing: isPurchasing});
    }
    order = () => {
        this.setState({sendingOrder: true});
        const order = {
            name: "Chuck Norris",
            address: "Behind you",
            ingredients: this.state.ingredients,
            totalPrice: this.state.burgerPrice,
            deliveryMethod: "Back-in-Time Delivery"
        };
        axios.post('orders.json', order)
            .then(response => {
                this.setState({sendingOrder: false, purchasing: false});
            })
            .catch(error => {
                this.setState({sendingOrder: false, purchasing: false});
            });
    }
    render() {

        if (this.state.error) {
            return <p style={{padding: '20px 0', textAlign: 'center'}}>Ingredient list could not be downloaded.</p>;
        } else if (!this.state.ingredients) {
            return <Spinner />;
        }

        let modalContent = this.state.sendingOrder ?
            <Spinner /> :
            <PurchaseSummary
                ingredients={this.state.ingredients}
                price={this.state.burgerPrice}
                cancel={this.purchase.bind(null, false)}
                order={this.order}
            />
        ;

        return (
            <>
                <Modal show={this.state.purchasing} cancel={this.purchase.bind(null, false)}>
                    {modalContent}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    burgerPrice={this.state.burgerPrice}
                    lessIngredient={this.lessIngredient}
                    moreIngredient={this.moreIngredient}
                    ingredients={this.state.ingredients}
                    purchase={this.purchase}
                />
            </>
        );
    }
}

export default withErrorHandling(BurgerBuilder, axios);