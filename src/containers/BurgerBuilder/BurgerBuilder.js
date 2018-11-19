import React from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import PurchaseSummary from '../../components/BurgerControls/PurchaseSummary/PurchaseSummary';

const INGREDIENT_PRICES = {
    meat: 1.2,
    cheese: 0.8,
    salad: 0.5,
    bacon: 1
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        burgerPrice: 4,
        purchasing: false
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
    render() {
        return (
            <>
                <Modal show={this.state.purchasing} cancel={this.purchase.bind(null, false)}>
                    <PurchaseSummary
                        ingredients={this.state.ingredients}
                        price={this.state.burgerPrice}
                        cancel={this.purchase.bind(null, false)}
                    />
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

export default BurgerBuilder;