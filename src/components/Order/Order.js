import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    //Turning the ingredient object to an array of objects with key-value pairs
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return (
            <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
                {ingredient.name} ({ingredient.amount})
            </span>
        );
    });

    return(
        <div className={classes.Orders}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
    
};

export default order;