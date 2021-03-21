import React, { Component } from 'react'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    //This could be a functional component. Doesn't have to be a class component
    componentDidUpdate(){
        console.log('[OrderSummary] did update');
    }

    render(){
        /*
        Getting the ingredients object from 'BurgerBuilder' and transforming it into an array, 
        then mapping it and returning a list item with the key and its value.
        */
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return(
            <Auxiliary>
            <h3>Your order</h3>
            <p>A delicius burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxiliary>
        );
    }
}
    


export default OrderSummary;