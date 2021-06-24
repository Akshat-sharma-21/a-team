import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
// importing redux components
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mainReducer from "./reducers";
// stripe setup
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const store = createStore(mainReducer, applyMiddleware(thunk)); // The main store where all the data will be managed

const stripePromise = loadStripe(
  "pk_test_51J4fqnFgbBuqeMyWCpbCYQvYa8vXqGSxY9XEtGMiARgSZH1r0JIRCzH41x6mHpUeKf2HIMdDGGBQudl2pkWlhjJU00xXNP7VhC"
); // initializing stripe with the public key

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();
