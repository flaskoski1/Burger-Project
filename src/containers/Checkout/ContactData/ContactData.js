import React, { Component, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { updateObject, checkValidity } from "../../../shared/utility";
const contactData = props => {
  // state = {
  //   orderForm: {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      },
      validation: {},
      value: "fastest",
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);
    const formData = {};
    for (let formElementIdentifier in orderForm)
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
      // customer: {
      //   name: "Max Schwarzmuller",
      //   address: {
      //     street: "Teststreet 1",
      //     zipCode: "41351",
      //     country: "Germany"
      //   },
      //   email: "test@test.com"
      // },
      // deliveryMethod: "fastest"
    };
    props.onOrderBurger(order, props.token);
  };
  // premesteno vo shared/utility kako edna funkcija sho se povikuva na povekje mesta
  // checkValidity(value, rules) {
  //   //console.log(rules, "rules");
  //   let isValid = true;
  //   if (!rules) {
  //     return true;
  //   }
  //   if (rules.required) {
  //     isValid = value.trim() !== "" && isValid;
  //   }
  //   if (rules.minLength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }
  //   if (rules.maxLength) {
  //     isValid = value.length <= rules.minLength && isValid;
  //   }
  //   if (rules.isEmail) {
  //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //     isValid = pattern.test(value) && isValid;
  //   }

  //   if (rules.isNumeric) {
  //     const pattern = /^\d+$/;
  //     isValid = pattern.test(value) && isValid;
  //   }

  //   return isValid;
  // }
  const inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value, "(event target value)");

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
    // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    // console.log(updatedFormElement, "updatedFormElement");

    // console.log(event.target.value, "value");
    // console.log(updatedOrderForm, "update");
  };
  // inputChangedHandler = (event, inputIdentifier) => {
  //   const updatedOrderForm = {
  //     ...this.state.orderForm
  //   };
  //   const updatedFormElement = {
  //     ...updatedOrderForm[inputIdentifier]
  //   };
  //   updatedFormElement.value = event.target.value;
  //   updatedOrderForm[inputIdentifier] = updatedFormElement;
  //   this.setState({ orderForm: updatedOrderForm });
  // };
  // render() {
  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  // console.log(this.props.price, "price");
  // console.log(formElementsArray, "element");
  let form = (
    <form onSubmit={orderHandler}>
      {/* <Input
          // inputtype="input"
          // type="text"
          // name="name"
          // placeholder="Your Name"
          elementType="..."
          elementConfig="..."
          value="..."
        ></Input> */}
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}

      {/* <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Mail"
        ></Input>
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        ></Input>
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        ></Input> */}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
// class ContactData extends Component {
//   state = {
//     // name: "",
//     // email: "",
//     // address: {
//     //   street: "",
//     //   postalCode: ""
//     // },
//     orderForm: {
//       // customer: {
//       name: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Your Name"
//         },
//         value: ""
//       },
//       // }"Max Schwarzmuller",
//       // address: {
//       street: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Street"
//         },
//         value: ""
//       },
//       // "Teststreet 1",
//       zipCode: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "ZIP Code"
//         },
//         value: ""
//       },
//       // "41351",
//       country: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Country"
//         },
//         value: ""
//       },
//       //  "Germany",
//       // },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Your E-Mail"
//         },
//         value: ""
//       },
//       // "test@test.com",
//       // },
//       deliveryMethod: {
//         elementType: "select",
//         elementConfig: {
//           options: [
//             { value: "fastest", displayValue: "Fastest" },
//             { value: "cheapest", displayValue: "Cheapest" }
//           ]
//           // config: {}
//           // type: "text",
//           // placeholder: "Your Name"
//         },
//         value: ""
//       }
//       // "fastest"
//     },
//     loading: false
//   };
