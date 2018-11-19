import React from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        sideDrawerOpen: false
    }
    toggleSideDrawer = () => {
        this.setState(prevState => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    }
    closeSideDrawer = () => {
        this.setState({sideDrawerOpen: false});
    }
    render() {
        return (
            <div style={{position: 'relative'}}>
                <Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
                <SideDrawer open={this.state.sideDrawerOpen} close={this.closeSideDrawer}/>
                <div className={classes.Content}>{this.props.children}</div>
            </div>
        );
    }
}

export default Layout;