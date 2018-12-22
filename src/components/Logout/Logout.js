import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

const Logout = props => {
    props.logout();
    return <Redirect to="/" />
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);