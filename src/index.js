import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./components/Store"; // Assuming this is your Redux store
import { Provider } from "react-redux"; // Import Provider from react-redux

// Render the app with Redux Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
