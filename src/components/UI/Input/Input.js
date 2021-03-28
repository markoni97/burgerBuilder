import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    let validationError = null;
    const cssClasses = [classes.InputElement];

    if(!props.isValid && props.hasValidation && props.isTouched){
        cssClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value</p>
    }
    
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className={cssClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('textArea'):
            inputElement = <textarea 
                className={cssClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
            <select 
                className={cssClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>
            );
            break;
        default:
            inputElement = <input 
                className={cssClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

    
};

export default input;