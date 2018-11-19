import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const SideDrawer = props => {
    return (
        <>
            <Backdrop show={props.open} cancel={props.close}/>
            <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems />
            </div>
        </>
    );
}

export default SideDrawer;