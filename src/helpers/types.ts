import { ChainConfig } from "caip-wallet";
import { ImageSourcePropType } from "react-native";

export interface ChainMetadata extends ChainConfig {
  logo: ImageSourcePropType;
  rgb: string;
}

export interface NamespaceMetadata {
  [reference: string]: ChainMetadata;
}
