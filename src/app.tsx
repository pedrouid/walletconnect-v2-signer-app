import React from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar } from "react-native";

import { appStyles } from "./styles";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={appStyles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={appStyles.engine}>
              <Text style={appStyles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={appStyles.body}>
            <View style={appStyles.sectionContainer}>
              <Text style={appStyles.sectionTitle}>WalletConnect</Text>
              <Text style={appStyles.sectionDescription}>
                Welcome to{" "}
                <Text style={appStyles.highlight}>WalletConnect</Text> Signer
                app.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
