import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpen){
        attachedClasses.pop();
        attachedClasses.push(classes.Open);
    }
    return(
        <Auxiliary>
            <Backdrop show={props.isOpen} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" margBottom = "32px"/>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;