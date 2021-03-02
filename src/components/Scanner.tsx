import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";

interface ScannerProps {
  onRead: (data: any) => void;
  onCancel: () => void;
}

const Scanner = (props: ScannerProps) => (
  <QRCodeScanner
    onRead={(e: any) => props.onRead(e.data)}
    fadeIn={false}
    containerStyle={styles.outside}
    topViewStyle={styles.outside}
    bottomViewStyle={styles.outside}
    bottomContent={
      <TouchableOpacity onPress={props.onCancel} style={styles.button}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    }
  />
);

export const styles = StyleSheet.create({
  outside: {
    backgroundColor: "#000",
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  button: {
    padding: 16,
  },
});

export default Scanner;
