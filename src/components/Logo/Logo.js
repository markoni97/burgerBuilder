import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{
            height: props.height,
            marginBottom: props.margBottom
            }}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    );
}

export default logo;