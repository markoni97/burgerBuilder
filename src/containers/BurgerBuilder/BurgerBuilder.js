import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        // }).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // });
    }

    updatePurchaseState = (ingredients) => {
        //Object.keys(ingredients) makes an array of all keys inside the ingredients object.
        //The Array will look like [salad, bacon, cheese, meat]
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce((prevValue, currValue) => {
            return prevValue + currValue;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({
            purchasing: false
        });
    }
    
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        //Setting the values of keys in 'disabledInfo' to true or false
        for(const key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.props.ings){
            burger = 
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    />
                </Auxiliary>;

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancled={this.purchaseCancleHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.totalPrice}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return(
            <Auxiliary>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));