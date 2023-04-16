import { Contract, ethers, Provider } from "ethers";

const netWorkID = "5777";
export const chainID = 11155111; // sepolia
const contractAddress = "0x44fEa756bA11ac83c234F40ADCA73e81EE2cD51B";

export const loadContracts = async (name, provider) => {
  // if (!netWorkID) {
  //   throw new Error("no network found");
  //   return;
  // }
  const res = await fetch(`./contracts/${name}.json`);
  const artifacts = await res.json();
  // if (!artifacts.networks[netWorkID].address) {
  //   throw new Error("no contract address found");
  //   return;
  // }
  const contract = new Contract(contractAddress, artifacts.abi, provider);
  // console.log(contract);
  return contract;
};

export const desctructState = (state) => {
  // console.log({ ...state });
  return { ...state };
};

export const coinChartColor = (firstPrice, lastPrice) => {
  return firstPrice > lastPrice ? "redChart" : "greenChart";
};

export const CoinPricesMaker = (price) => {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const calcEtherToWei = function (val) {
  return ethers.utils.parseEther(val.toString());
};
