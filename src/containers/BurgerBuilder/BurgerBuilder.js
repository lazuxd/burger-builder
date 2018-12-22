import React from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import PurchaseSummary from '../../components/BurgerControls/PurchaseSummary/PurchaseSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../redux/actions';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        sendingOrder: false,
        error: false
    }
    componentDidMount() {
        this.props.loadIngredients();
    }
    purchase = (isPurchasing) => {
        this.setState({purchasing: isPurchasing});
    }
    order = () => {
        this.props.history.push('/checkout');
    }
    render() {

        if (this.state.error) {
            return <p style={{padding: '20px 0', textAlign: 'center'}}>Ingredient list could not be downloaded.</p>;
        } else if (!this.props.ingredients) {
            return <Spinner />;
        }

        let modalContent = this.state.sendingOrder ?
            <Spinner /> :
            <PurchaseSummary
                ingredients={this.props.ingredients}
                price={this.props.burgerPrice}
                cancel={this.purchase.bind(null, false)}
                order={this.order}
            />
        ;

        return (
            <>
                <Modal show={this.state.purchasing} cancel={this.purchase.bind(null, false)}>
                    {modalContent}
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BurgerControls
                    burgerPrice={this.props.burgerPrice}
                    lessIngredient={this.props.lessIngredient}
                    moreIngredient={this.props.moreIngredient}
                    ingredients={this.props.ingredients}
                    purchase={this.purchase}
                />
            </>
        );
    }
}

const mapStateToProps = state =>({
    ingredients: state.ingredients.quantity,
    burgerPrice: state.ingredients.burgerPrice
});

const mapDispatchToProps = dispatch => ({
    loadIngredients: () => dispatch(actions.loadIngredients()),
    lessIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    moreIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandling(withRouter(BurgerBuilder), axios));