import { NextResponse } from "next/server"

// This is the data from the provided JSON
const holdingsData = [
  {
    coin: "USDC",
    coinName: "USDC",
    logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    currentPrice: 85.41,
    totalHolding: 0.0015339999999994802,
    averageBuyPrice: 1.5863185433764244,
    stcg: {
      balance: 0.0015339999999994802,
      gain: 0.12858552735441697,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "WETH",
    coinName: "Polygon PoS Bridged WETH (Polygon POS)",
    logo: "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
    currentPrice: 211756,
    totalHolding: 0.00023999998390319965,
    averageBuyPrice: 3599.856066001555,
    stcg: {
      balance: 0.00023999998390319965,
      gain: -49.957471193511736,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "SOL",
    coinName: "SOL (Wormhole)",
    logo: "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png?1696522175",
    currentPrice: 14758.01,
    totalHolding: 3.469446951953614e-17,
    averageBuyPrice: 221.42847548590152,
    stcg: {
      balance: 3.469446951953614e-17,
      gain: 5.043389846205066e-13,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "WPOL",
    coinName: "Wrapped POL",
    logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    currentPrice: 22.08,
    totalHolding: 2.3172764293128694,
    averageBuyPrice: 0.5227311370876341,
    stcg: {
      balance: 1.3172764293128694,
      gain: 49.954151016387065,
    },
    ltcg: {
      balance: 1,
      gain: 20,
    },
  },
  {
    coin: "MATIC",
    coinName: "Polygon",
    logo: "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
    currentPrice: 22.22,
    totalHolding: 2.75145540184285,
    averageBuyPrice: 0.6880274617804887,
    stcg: {
      balance: 2.75145540184285,
      gain: 59.244262152615974,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "GONE",
    coinName: "Gone",
    logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    currentPrice: 0.0001462,
    totalHolding: 696324.3075326696,
    averageBuyPrice: 0.00001637624055112482,
    stcg: {
      balance: 696324.3075326696,
      gain: 90.39943939952589,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "USDT",
    coinName: "Arbitrum Bridged USDT (Arbitrum)",
    logo: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    currentPrice: 85.42,
    totalHolding: 0.0001580000000558357,
    averageBuyPrice: 1.4988059369185402,
    stcg: {
      balance: 0.0001580000000558357,
      gain: 0.01325954866665267,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "USDC",
    coinName: "Bridged USDC (Polygon PoS Bridge)",
    logo: "https://coin-images.coingecko.com/coins/images/33000/large/usdc.png?1700119918",
    currentPrice: 85.41,
    totalHolding: 0.005806999999992795,
    averageBuyPrice: 1.5405071277176852,
    stcg: {
      balance: 0.005806999999992795,
      gain: 0.48703014510873915,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "SLN",
    coinName: "Smart Layer Network",
    logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
    currentPrice: 6.66,
    totalHolding: 0.01,
    averageBuyPrice: 4.999247835735738,
    stcg: {
      balance: 0.01,
      gain: 0.016607521642642627,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
  {
    coin: "OX",
    coinName: "OX Coin",
    logo: "https://coin-images.coingecko.com/coins/images/35365/large/logo.png?1708395976",
    currentPrice: 0.13319,
    totalHolding: 5,
    averageBuyPrice: 0.018408606024462898,
    stcg: {
      balance: 5,
      gain: 0.5739069698776855,
    },
    ltcg: {
      balance: 0,
      gain: 0,
    },
  },
]

export async function GET() {
  return NextResponse.json(holdingsData)
}
