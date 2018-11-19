import React from 'react';

import classes from './Menu.module.css';

const Menu = props => {
    return (
        <div
            className={classes.Menu}
            style={{width: props.size, height: props.size}}
            onClick={props.toggleSideDrawer}
        >
            <div className={classes.Bars}></div>
            <div className={classes.Bars}></div>
            <div className={classes.Bars}></div>
        </div>
    );
}

export default Menu;