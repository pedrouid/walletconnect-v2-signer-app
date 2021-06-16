import { ImageSourcePropType } from "react-native";

export interface ChainMetadata {
  name: string;
  logo: ImageSourcePropType;
  rgb: string;
}

export interface NamespaceMetadata {
  [reference: string]: ChainMetadata;
}
