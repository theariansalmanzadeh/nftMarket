// import { ethers } from "ethers";

const NFTMarket = artifacts.require("NFTMarket");

contract("NFTMarket", (accounts) => {
  let _contract = null;
  let tokenPrice = web3.utils.toWei("0.25", "ether");
  let tokenPrice2 = web3.utils.toWei("0.15", "ether");

  before(async () => {
    _contract = await NFTMarket.deployed();
    const accBalance = await web3.eth.getBalance(accounts[0]);
    console.log(accBalance);
  });

  describe("Mint Token", () => {
    const uri = "https://nftmarket.com";
    const uri2 = "https://nftmarket2.com";
    const uri3 = "https://nftmarket3.com";
    const uri4 = "https://nftmarket4.com";
    before(async () => {
      await _contract.mintToken(tokenPrice, uri, {
        value: web3.utils.toWei("0.025", "ether"),
        from: accounts[0],
      });
      await _contract.mintToken(tokenPrice, uri2, {
        value: web3.utils.toWei("0.025", "ether"),
        from: accounts[0],
      });
      await _contract.mintToken(tokenPrice2, uri3, {
        value: web3.utils.toWei("0.025", "ether"),
        from: accounts[0],
      });
      await _contract.mintToken(tokenPrice2, uri4, {
        value: web3.utils.toWei("0.025", "ether"),
        from: accounts[0],
      });
    });

    it("buy nft", async () => {
      await _contract.buyNFT(1, { value: tokenPrice, from: accounts[1] });
    });

    it("total supply", async () => {
      const allNft = await _contract.getAllNfts();
      console.log(allNft);
      assert(true, "total supply is fucked up");
    });
    it("index of owners NFTs", async () => {
      await _contract.burnToken(2, {
        from: accounts[0],
      });

      const NftOwnedIndex = await _contract.testing(4, {
        from: accounts[0],
      });

      const allNft = await _contract.getAllNfts();
      console.log(allNft);

      console.log(NftOwnedIndex.toNumber());

      assert(true, "total supply is fucked up");
    });

    it("get all NFTs from smart contract", async () => {
      console.log(NFTs);
    });
  });
});
