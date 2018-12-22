import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Authenticate from './Authenticate/Authenticate';
import Logout from '../components/Logout/Logout';
import * as actions from '../redux/actions';

const GotoRoot = props => <Redirect to="/" />;

class App extends Component {
  componentDidMount() {
    const authData = sessionStorage.getItem('authInfo');
    if (authData) {
      this.props.setAuth(JSON.parse(authData));
    }
  }
  render() {
    return (
      <BrowserRouter basename="/Websites/BurgerBuilder">
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={this.props.isAuthenticate ? Checkout : GotoRoot} />
            <Route path="/orders" component={this.props.isAuthenticate ? Orders : GotoRoot} />
            <Route path="/logout" component={this.props.isAuthenticate ? Logout : GotoRoot} />
            <Route path="/authenticate" component={!this.props.isAuthenticate ? Authenticate : GotoRoot} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticate: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  setAuth: (authData) => dispatch(actions.setAuth(authData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
