import { useEffect, useState } from "react";
import { FormLabel, TextField } from "@material-ui/core";
import { Scaffold, ReallosButton } from "../utilities/core";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { fetchUser } from "../../actions/userActions";
import { createPaymentIntent } from "../../actions/roadmapActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Payment.css";

const mapStateToProps = (state) => ({
  utils: state.utils,
  roadmap: state.roadmap,
  user: state.user,
});

const mapActionToProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

function Payment(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false); // variable to store the loading status

  useEffect(() => {
    if (props.utils.reload === true) props.fetchUser();
  }, []);

  const submitPayment = () => {
    // function to submit the payment

    createPaymentIntent(
      props.roadmap.HomeInspection.Professional,
      props.user.Transaction
    ).then((clientKey) => {
      stripe
        .confirmCardPayment(clientKey, {
          // confirming the payment
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: props.user.Name,
              phone: props.user.Phone,
              email: props.user.Email,
            },
          },
        })
        .then((paymentResult) => {
          if (paymentResult.paymentIntent.status === "succeeded") {
            // if the payment succeeded
            // load the success screen
            setLoading(false); // setting the loading state to false
          } else {
            // if the payment wasn't successful
            // load the failure status
          }
        })
        .catch((err) => {
          // if there was an error
          console.error(err); // logging the error
          // load the failure status
        });
    });
  };

  return (
    <Scaffold>
      <FormLabel>
        Card Details
        <CardElement className="payment-card-number" />
      </FormLabel>
      <ReallosButton
        primary
        disabled={!stripe || isLoading}
        fullWidth
        onClick={() => {
          submitPayment();
          setLoading(true); // setting loading to true
        }}
      >
        Pay
      </ReallosButton>
    </Scaffold>
  );
}

export default connect(mapStateToProps, mapActionToProps)(Payment);
