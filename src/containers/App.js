import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Authenticate from './Authenticate/Authenticate';
import Logout from '../components/Logout/Logout';

const GotoRoot = props => <Redirect to="/" />;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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

export default connect(
  mapStateToProps
)(App);
