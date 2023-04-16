import React, { useEffect, useReducer, useContext, createContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers, providers } from "ethers";
import { loadContracts, chainID } from "../web3/utils";

const web3Context = createContext();

const accountStatus = {
  noProvider: "no-provider",
  incorrectChain: "incorrectChain",
  notConnected: "not-connected",
  connected: "account-connected",
};

export const accountStateFreeze = Object.freeze(accountStatus);

const initialState = {
  initalContract: null,
  contract: null,
  ethereum: null,
  provider: null,
  accountState: accountStatus.connected,
  accountAddress: "",
  networkID: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ethereum":
      return { ...state, ethereum: window.ethereum };
      break;
    case "noethereum":
      return { ...state, accountState: accountStateFreeze.noProvider };
      break;
    case "notConnectedWallet":
      return { ...state, accountState: accountStateFreeze.notConnected };
      break;
    case "incorrectChain":
      return { ...state, accountState: accountStateFreeze.incorrectChain };
      break;
    case "walletConnected":
      return { ...state, accountState: accountStateFreeze.connected };
      break;
    case "setNetwork":
      return { ...state, networkID: action.status };

    case "contract":
      return { ...state, contract: action.payload };
      break;
    case "accountChange":
      if (action.address === "") {
        return { ...state, accountAddress: "" };
      }

      let newAddress = `${action.address.slice(0, 4)}...${action.address.slice(
        -3
      )}`;
      return { ...state, accountAddress: newAddress };
    case "getWeb3":
      return {
        ...state,
        contract: action.contract,
        ethereum: action.ethereum,
        provider: action.provider,
        initalContract: action.RawContract,
      };

      break;

    case "setProvider":
      return {
        ...state,
        provider: action.provider,
      };
  }
  return state;
};

function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!window.ethereum) {
      dispatch({ type: "noEthereum" });
      return;
    }

    const initWeb3 = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const net = await provider.getNetwork();

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      // console.log(net.chainId);

      if (net.chainId !== chainID) {
        dispatch({ type: "setProvider", provider });
        dispatch({ type: "incorrectChain" });
        return;
      }
      const RawContract = await loadContracts("NFTMarket", provider);
      const signer = provider.getSigner();
      const contract = RawContract.connect(signer);

      console.log(contract.signer);

      dispatch({
        type: "getWeb3",
        contract: contract,
        ethereum: window.ethereum,
        provider: provider,
        RawContract,
      });

      // console.log("22");
    };

    initWeb3();
  }, [dispatch]);

  //account change
  useEffect(() => {
    // console.log(state.ethereum);
    if (!state.ethereum) return;
    (async () => {
      const res = await state.provider.listAccounts();

      if (res.length === 0) {
        dispatch({ type: "accountChange", address: "" });
        dispatch({ type: "notConnectedWallet" });
      } else {
        dispatch({ type: "accountChange", address: res[0] });
        dispatch({ type: "walletConnected" });
      }
    })();

    state.ethereum.on("accountsChanged", (event) => {
      if (event[0]) {
        dispatch({ type: "accountChange", address: event[0] });
        dispatch({ type: "walletConnected" });
      } else {
        dispatch({ type: "accountChange", address: "" });
        dispatch({ type: "notConnectedWallet" });
      }
    });
  }, [state.ethereum, state.provider]);

  //chain change
  useEffect(() => {
    if (!state.provider) return;

    // console.log(signer.getAddress());
    (async () => {
      const network = await state.provider.getNetwork();
      network.chainId === chainID
        ? dispatch({ type: "setNetwork", status: true })
        : dispatch({ type: "setNetwork", status: false });
    })();
  }, [state.provider]);

  return (
    <web3Context.Provider value={{ state, dispatch }}>
      {children}
    </web3Context.Provider>
  );
}

export const useWeb3 = () => {
  return useContext(web3Context);
};

export default Web3Provider;
