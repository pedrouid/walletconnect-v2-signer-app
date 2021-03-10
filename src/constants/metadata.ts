import { config } from "caip-api";
import { NamespaceMetadata } from "../helpers";

export const CHAIN_METADATA: { [namespace: string]: NamespaceMetadata } = {
  eip155: {
    "1": {
      ...config.eip155["1"],
      name: "Ethereum",
      logo: require("../assets/ethereum.png"),
      rgb: "99, 125, 234",
    },
    "5": {
      ...config.eip155["5"],
      logo: require("../assets/goerli.png"),
      rgb: "189, 174, 155",
    },
    "10": {
      ...config.eip155["10"],
      name: "Optimism",
      logo: require("../assets/optimism.png"),
      rgb: "233, 1, 1",
    },
    "69": {
      ...config.eip155["69"],
      logo: require("../assets/optimism.png"),
      rgb: "233, 1, 1",
    },
    "100": {
      ...config.eip155["100"],
      logo: require("../assets/xdai.png"),
      rgb: "73, 169, 166",
    },
    "137": {
      ...config.eip155["137"],
      name: "Matic",
      logo: require("../assets/matic.png"),
      rgb: "43, 109, 239",
    },
    "80001": {
      ...config.eip155["80001"],
      logo: require("../assets/matic.png"),
      rgb: "43, 109, 239",
    },
    "79377087078960": {
      ...config.eip155["79377087078960"],
      logo: require("../assets/arbitrum.png"),
      rgb: "44, 55, 75",
    },
  },
};
