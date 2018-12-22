import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {
                props.isAuthenticate ?
                <>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </> :
                <NavigationItem link="/authenticate">Authenticate</NavigationItem>
            }
        </ul>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticate: state.auth.token !== null
})

export default withRouter(connect(
    mapStateToProps
)(NavigationItems));