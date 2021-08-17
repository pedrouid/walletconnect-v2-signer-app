import React, { useContext } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

import { Context } from "../context";

const Scanner = () => {
  const { client } = useContext(Context);

  async function onRead(data: any) {
    if (typeof data !== "string") {
      return;
    }
    if (!data.startsWith("wc:")) {
      return;
    }
    try {
      if (typeof client === "undefined") {
        return;
      }
      await client.pair({ uri: data });
    } catch (e) {
      console.error(e);
      return;
    }
  }

  return (
    <>
      <QRCodeScanner
        onRead={(e: any) => onRead(e.data)}
        fadeIn={false}
        topContent={
          <Text style={styles.centerText}>Scan WalletConnect app qrcode</Text>
        }
      />
      <TextInput
        placeholder={"...or input WC uri here"}
        onChangeText={(text) => onRead(text)}
        style={styles.TextInput}
        autoCorrect={false}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    paddingTop: 100,
    color: "#000",
  },
  textBold: {
    fontWeight: "500",
    color: "#fff",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  button: {
    padding: 16,
  },
  TextInput: {
    backgroundColor: "#ccc",
    height: 40,
    margin: 20,
    padding: 10,
    color: "green",
  },
});

export default Scanner;
