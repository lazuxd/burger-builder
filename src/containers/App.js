import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
