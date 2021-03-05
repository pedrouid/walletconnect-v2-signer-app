import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SessionTypes } from "@walletconnect/types";
import { JsonRpcRequest } from "@json-rpc-tools/utils";

interface RequestProps {
  request: SessionTypes.PayloadEvent;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

const Request = (props: RequestProps) => {
  const request = props.request.payload as JsonRpcRequest;
  return (
    <View style={styles.container}>
      <Text>{"JSON-RPC Request"}</Text>
      <Text>{"Method"}</Text>
      <Text>{request.method}</Text>
      <Text>{"Params"}</Text>
      <Text>{JSON.stringify(request.params)}</Text>
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
});

export default Request;
