import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { Context } from "../context";

const Modal = () => {
  const { proposal, request } = useContext(Context);
  if (typeof proposal !== "undefined") {
    return <View style={styles.container}>{proposal}</View>;
  } else if (typeof request !== "undefined") {
    return <View style={styles.container}>{request}</View>;
  } else {
    return <View style={styles.container}>{"No content"}</View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
  },
});

export default Modal;
