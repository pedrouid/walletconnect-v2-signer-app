import React from "react";
import { View, StyleSheet } from "react-native";
import { SessionTypes } from "@walletconnect/types";

interface RequestProps {
  request: SessionTypes.PayloadEvent;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

const Request = (props: RequestProps) => {
  const { request } = props;
  return <View style={styles.container}>{request}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
  },
});

export default Request;
