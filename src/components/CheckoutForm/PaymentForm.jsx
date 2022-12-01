import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  nextStep,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fullfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Método de pagamento
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {(elements, stripe) => {
            console.log("stripe", stripe);
            console.log("elements", elements);
            return (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={backStep}>
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!stripe}
                    color="primary"
                  >
                    Finalizar {checkoutToken.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
