import React, { useContext } from "react";
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from "react-native";

import { getChainConfig } from "caip-wallet";

import { Context } from "../context";

const Home = () => {
  const { loading, accounts } = useContext(Context);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.content}>
          <View style={styles.body}>
            {loading ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>{"Loading..."}</Text>
              </View>
            ) : (
              <View style={styles.sectionContainer}>
                {accounts.map((account) => {
                  const [address, chainId] = account.split("@");
                  return (
                    <React.Fragment key={account}>
                      <Text style={styles.sectionTitle}>
                        {getChainConfig(chainId).name}
                      </Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={styles.sectionDescription}>
                        {address}
                      </Text>
                    </React.Fragment>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#F3F3F3",
    color: "#000",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "#FFF",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: "#444",
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: "#444",
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
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

export default Home;
