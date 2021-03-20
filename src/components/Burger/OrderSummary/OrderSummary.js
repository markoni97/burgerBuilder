import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
    /*
    Getting the ingredients object from 'BurgerBuilder' and transforming it into an array, 
    then mapping it and returning a list item with the key and its value.
    */
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    });

    return(
        <Auxiliary>
            <h3>Your order</h3>
            <p>A delicius burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Auxiliary>
    );
}

export default orderSummary;