import React from 'react';

import classes from './Layout.module.css';

const Layout = props => {
    return (
        <div>
            <div>Toolbar, SideDrawer, BackBtn</div>
            <div className={classes.Content}>{props.children}</div>
        </div>
    );
};

export default Layout;