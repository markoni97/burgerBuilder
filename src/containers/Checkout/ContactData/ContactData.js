import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    /* 
                    Important to use default element tag names, because they will be used in the
                    input element that has those html element tag names
                    */
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                isValid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        //Prevents the page from reloading
        event.preventDefault();

        //.json is specific to firebase. Its diferent for custom database
        //In a real app you wouldnt send 'price' because the youser could manipulate it
        this.setState({loading: true});
        const formData = {};
        for(let formInputIdentifier in this.state.orderForm){
            //Creating ket value pairs. First iteration is = 'name: Marko'
            formData[formInputIdentifier] = this.state.orderForm[formInputIdentifier].value;
        } 
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false
            });
            this.props.history.push('/');

        }).catch(error => {
            this.setState({
                loading: false
            });
        });

    }

    inputChangedHandler = (event, inputIdentifier) => {
        //Creating a copy from the orderForm. This is not a deep copy
        const updatedOrderForm = {...this.state.orderForm};
        //Creating a copy of the element object inside the order form. The inputIdentifier will have 
        // a value of 'name' or 'street' or 'email'... Now we make copies of these objects
        const updatedElement = {...updatedOrderForm[inputIdentifier]};
        updatedElement.value = event.target.value;
        updatedElement.isValid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

        /* 
        Only the last check is determening if the form is valid. That's why we check the previous value
        an that's why we set the formIsValid value initialy to true.
        */
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].isValid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });

    }

    render(){
        /* 
        Dynamically creating the input fields by looping through an array of object 
        and assigning its properties 
        */
        //Key is equal to name, street, zip code..
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(element => {
                return<Input 
                key={element.id}
                isValid={element.config.isValid}
                isTouched={element.config.touched}
                hasValidation={element.config.validation}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangedHandler(event, element.id)}
                />
            })}
            <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
        </form>);
        
        if(this.state.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);