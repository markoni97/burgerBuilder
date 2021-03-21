import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state ={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        //Setting the state when it depends on the old state
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
        
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                closed={this.sideDrawerClosedHandler}
                isOpen={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;