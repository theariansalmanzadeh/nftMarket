const instance = await NFTMarket.deployed();

instance.mintToken(
  "250000000000000000",
  "https://gateway.pinata.cloud/ipfs/QmTp14aEM44nNmgr3fjjfF4NbFKu4rCqo3RpdKXPFiTvGy?_gl=1*1743nh2*_ga*NDA5NDk2NDM4LjE2NzM5Mjk4NDc.*_ga_5RMPXG14TE*MTY3MzkyOTg0Ni4xLjEuMTY3MzkzMDE4Ni4zNC4wLjA.",
  { value: "25000000000000000", from: account[0] }
);
instance.mintToken(
  "250000000000000000",
  "https://gateway.pinata.cloud/ipfs/Qmcao9yp1MLwSESC6Lw4uaiUuHan2n8EfoZRSLxDakjKPL?_gl=1*ylnd8x*_ga*NDA5NDk2NDM4LjE2NzM5Mjk4NDc.*_ga_5RMPXG14TE*MTY3MzkyOTg0Ni4xLjEuMTY3MzkzMDE4Ni4zNC4wLjA.",
  { value: "25000000000000000", from: account[0] }
);
