import "../styles/globals.css";
import "../styles/custom-bootstrap.scss";

import { Provider } from "react-redux";
import Web3Provider from "../web3/web3Provider";

import store from "../store/index";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Web3Provider>
  );
}

export default MyApp;
