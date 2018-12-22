import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Order from '../../components/Orders/Order/Order';
import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling';

class Orders extends React.Component {
    state = {
        orders: null
    }
    componentDidMount() {
        axios.get('/orders.json?auth='+this.props.token+'&orderBy="userId"&equalTo="'+this.props.userId+'"')
            .then(result => {
                const orders = Object.keys(result.data).map(key => ({...result.data[key], id: key}));
                this.setState({orders});
            })
            .catch(error => {
            });
    }
    render() {
        if (!this.state.orders) {
            return null;
        }
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.auth.id,
    token: state.auth.token
});

export default connect(
    mapStateToProps
)(withErrorHandling(Orders, axios));