import { NamespaceMetadata } from "../helpers";

export const CHAIN_METADATA: { [namespace: string]: NamespaceMetadata } = {
  eip155: {
    "1": {
      name: "Ethereum",
      logo: require("../assets/ethereum.png"),
      rgb: "99, 125, 234",
    },
    "5": {
      name: "Goerli",
      logo: require("../assets/goerli.png"),
      rgb: "189, 174, 155",
    },
    "10": {
      name: "Optimism",
      logo: require("../assets/optimism.png"),
      rgb: "233, 1, 1",
    },
    "42": {
      name: "Kovan",
      logo: require("../assets/ethereum.png"),
      rgb: "99, 125, 234",
    },
    "69": {
      name: "Optimism Kovan",
      logo: require("../assets/optimism.png"),
      rgb: "233, 1, 1",
    },
    "100": {
      name: "xDAI",
      logo: require("../assets/xdai.png"),
      rgb: "73, 169, 166",
    },
    "137": {
      name: "Matic",
      logo: require("../assets/matic.png"),
      rgb: "43, 109, 239",
    },
    "80001": {
      name: "Matic Mumbai",
      logo: require("../assets/matic.png"),
      rgb: "43, 109, 239",
    },
    "421611": {
      name: "Arbitrum Testnet",
      logo: require("../assets/arbitrum.png"),
      rgb: "44, 55, 75",
    },
  },
};
