import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  text: string;
  onPress: any;
}

const Button = (props: ButtonProps) => {
  const { onPress, text } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "#5a70b5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Button;
