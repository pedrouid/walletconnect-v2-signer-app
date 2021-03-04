import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Context } from "../context";

const Proposal = () => {
  const { proposal } = useContext(Context);

  return <View style={styles.container}>{proposal}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
  },
});

export default Proposal;
