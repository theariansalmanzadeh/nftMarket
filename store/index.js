import { configureStore, createSlice } from "@reduxjs/toolkit";
import { chainID } from "../web3/utils";

const initialState = {
  NftPreview: false,
  getPriceStatus: "fullField",
  coinPrices: {
    BTC: [0, 0],
    ETH: [0, 0],
    THT: [0, 0],
  },
  modalData: null,
  notifications: "",
  notfiyTx: "noTx",
  isLoadingWeb3: true,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    previewToggler(state, action) {
      console.log(state);
      state.NftPreview = !state.NftPreview;
    },
    previewData(state, action) {
      state.modalData = action.payload;
    },
    getCoinPrices(state, action) {
      const keys = Object.keys(state.coinPrices);
      state.coinPrices[keys[action.payload.index]] =
        action.payload.data.prices.flat();
      state.getPriceStatus = "fullField";
    },
    setStatusPrices(state, action) {
      state.getPriceStatus = action.payload;
    },
    setNotificationTrasaction(state, action) {
      state.notfiyTx = action.payload;
    },
  },
});

export const changeChains = () => {
  return async (dispatch) => {
    const res = await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainID.toString(16)}` }], // chainId must be in hexadecimal numbers
    });
    window.location.reload();
  };
};

export const web3Actions = web3Slice.actions;

const store = configureStore({
  reducer: { web3: web3Slice.reducer },
});

export default store;
