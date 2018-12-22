import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

import { NavLink } from 'react-router-dom';

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavLink to="/" exact activeStyle={{color: 'lime'}}>Home</NavLink>
            <NavLink to="/authenticate" activeStyle={{color: 'lime'}}>Authenticate</NavLink>
            {/* <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {
                props.isAuthenticate ?
                <>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </> :
                <NavigationItem link="/authenticate">Authenticate</NavigationItem>
            } */}
        </ul>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticate: state.auth.token !== null
})

export default connect(
    mapStateToProps
)(NavigationItems);