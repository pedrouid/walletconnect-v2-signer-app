import crypto from "crypto";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnect from "@walletconnect/client";
import { SafeAreaView, ScrollView, View, Text, StatusBar } from "react-native";

import { appStyles } from "./styles";

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [client, setClient] = useState(undefined as any);
  useEffect(() => {
    const initialize = async () => {
      console.log(`Starting WalletConnect...`);
      try {
        const _client = await WalletConnect.init({
          relayProvider: "wss://staging.walletconnect.org",
          storageOptions: {
            asyncStorage: AsyncStorage as any,
          },
        });
        console.log("WalletConnect initialized!");
        setClient(_client);
      } catch (e) {
        console.error(e);
      }
    };
    initialize();
  }, []);

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
              <Text style={appStyles.sectionDescription}>
                {crypto.randomBytes(32).toString("hex")}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
