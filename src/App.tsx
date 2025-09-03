/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GlobalAlert, globalAlertRef } from "@component";
import { store } from "@redux";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./page/home";

export function App() {
  return (
    <Provider store={store}>
      <HomePage />
      <ToastContainer />
      <GlobalAlert ref={globalAlertRef} />
    </Provider>
  );
}
