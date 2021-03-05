import React, { useContext } from "react";
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from "react-native";

import { Context } from "../context";

import Blockchain from "../components/Blockchain";

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
                    <Blockchain
                      key={`wallet:accounts:${account}`}
                      chainId={chainId}
                      address={address}
                    />
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
});

export default Home;
