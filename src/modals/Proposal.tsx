import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SessionTypes } from "@walletconnect/types";

import Button from "../components/Button";
import Blockchain from "../components/Blockchain";

interface ProposalProps {
  proposal: SessionTypes.Proposal;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

const Proposal = (props: ProposalProps) => {
  const { proposal, onApprove, onReject } = props;
  const { blockchain, jsonrpc } = proposal.permissions;
  const { metadata } = proposal.proposer;
  return (
    <View style={styles.container}>
      <Text>{`Session Proposal`}</Text>
      <Image style={styles.logo} source={{ uri: metadata.icons[0] }} />
      <Text>{metadata.name}</Text>
      <Text>{metadata.description}</Text>
      <Text>{metadata.url}</Text>
      <Text>{`Chains`}</Text>
      <View>
        {blockchain.chains.map((chainId) => (
          <Blockchain
            key={`proposal:blockchain:${chainId}`}
            chainId={chainId}
          />
        ))}
      </View>
      <Text>{`Methods`}</Text>
      <View>
        {jsonrpc.methods.map((method) => (
          <Text key={`proposal:jsonrpc:${method}`}>{method}</Text>
        ))}
      </View>
      <Button text="Approve" onPress={() => onApprove()} />
      <Button text="Reject" onPress={() => onReject()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Proposal;
