import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Menu from '../Menu/Menu';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Menu}>
                <Menu size={56} toggleSideDrawer={props.toggleSideDrawer}/>
            </div>
            <Logo />
            <nav className={classes.Container}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;