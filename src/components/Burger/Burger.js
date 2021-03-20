import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
/* Object.keys() returns a list of all the key properties inside the ingredients object 
(which is recived from BurgerBilder). Then I am maping all the values from the returned list. Inside the first map,
I'm returning a list with the length of the value of given ingredient key value. Then I'm maping that returned list
so that I can render a BurgerIngredient for every Item in that list. 
'reduce()' is used to merge (concat) all the arrays inside the 'transformedIngredients' array.
Example: If my 'cheese' key has the value of 2, then I am gonna render 'BurgerIngredients' 
with the type of 'cheese' two times.
*/
    let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((dontNeedThis, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((prevValue, currValue) => {
        return prevValue.concat(currValue);
    }, []);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;