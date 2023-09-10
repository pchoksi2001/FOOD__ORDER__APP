import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const CheckOut = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        postal:true,
        city:true
    })

    const isEmpty = value => value.trim() == '';
    const isFiveChar = value => value.trim().length === 2;

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalIsValid = !isEmpty(enteredPostal)


    setFormInputValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal:enteredPostalIsValid,
        city:enteredCityIsValid
    })

    console.log(enteredName,enteredCity,enteredPostal,enteredStreet)

    const formIsValid = enteredNameIsValid && 
                        enteredStreetIsValid && 
                        enteredPostalIsValid && 
                        enteredCityIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalcode:enteredPostal,
        city:enteredCity
    })

  };

    const nameInputClasses = `${classes.control} 
    ${formInputValidity.name ? '' : classes.invalid}` 

    const streetInputClasses = `${classes.control} 
    ${formInputValidity.street ? '' : classes.invalid}` 

    const postalcodeInputClasses = `${classes.control} 
    ${formInputValidity.postal ? '' : classes.invalid}` 

    const cityInputClasses = `${classes.control} 
    ${formInputValidity.city ? '' : classes.invalid}` 

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter valid name</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>please enter valid street</p>}
      </div>
      <div className={postalcodeInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputValidity.postal && <p>please enter valid postal code</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;