import { CHAIN_METADATA } from "../constants";
import { ChainMetadata } from "./types";

export function getChainMetadata(chainId: string): ChainMetadata {
  const [namespace, reference] = chainId.split(":");
  const namespaceMetadata = CHAIN_METADATA[namespace];
  if (typeof namespaceMetadata === "undefined") {
    throw new Error(`No metadata found for namespace: ${namespace}`);
  }
  const metadata = namespaceMetadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No metadata found for chainId: ${chainId}`);
  }
  return metadata;
}
