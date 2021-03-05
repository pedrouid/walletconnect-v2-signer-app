import React from "react";
import { getChainConfig } from "caip-api";
import { StyleSheet, Text } from "react-native";

interface BlockchainProps {
  chainId: string;
  address?: string;
}

const Blockchain = (props: BlockchainProps) => {
  const { chainId, address } = props;
  return (
    <React.Fragment>
      <Text style={styles.chain}>{getChainConfig(chainId).name}</Text>
      {address && (
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.address}>
          {address}
        </Text>
      )}
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  chain: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  address: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#444",
  },
});

export default Blockchain;
