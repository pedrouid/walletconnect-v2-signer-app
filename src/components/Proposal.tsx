import React from "react";
import { View, StyleSheet } from "react-native";

import { SessionTypes } from "@walletconnect/types";

interface ProposalProps {
  proposal: SessionTypes.Proposal;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

const Proposal = (props: ProposalProps) => (
  <View style={styles.container}>{props.proposal}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
  },
});

export default Proposal;
