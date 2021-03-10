import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SessionTypes } from "@walletconnect/types";

interface MetadataProps {
  metadata: SessionTypes.Metadata;
}

const Metadata = (props: MetadataProps) => {
  const { metadata } = props;
  return (
    <View style={styles.metadata}>
      <Image style={styles.logo} source={{ uri: metadata.icons[0] }} />
      <Text style={styles.name}>{metadata.name}</Text>
      <Text style={styles.desc}>{metadata.description}</Text>
      <Text style={styles.url}>{metadata.url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metadata: {
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "grey",
  },
  logo: { width: 50, height: 50 },
  name: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  desc: { fontSize: 18, marginBottom: 6 },
  url: { fontSize: 14, marginBottom: 6 },
});

export default Metadata;
