import React from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            meal: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        }
    }
    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls />
            </>
        );
    }
}

export default BurgerBuilder;