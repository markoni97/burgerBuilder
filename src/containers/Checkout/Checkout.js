import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component{
    state = {
        ingredients: null,
        totalPrice: 0
    }

    /*
    Changed from componentDidMount to componentWillMount.
    Because we need to fill in the ingredients before we render the children of this component,
    beacause the children need the ingredients 
    */
    componentWillMount(){
        //Parsing the querry params so that the output will be [salad, 1]...
        const querryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of querryParams.entries()){
            if(param[0] === 'price'){
                price = param[1];
            } else {
                //Accessing the object property with object[objectProperty]
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });

    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                cancel={this.cancelCheckoutHandler}
                continue={this.continueCheckoutHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (
                    <ContactData price={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>
                )} />
            </div>
        );
    }
}

export default Checkout;