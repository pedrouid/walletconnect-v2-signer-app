import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar } from "react-native";

import Wallet from "caip-wallet";
import Client from "@walletconnect/client";

import crypto from "crypto";
import { utils } from "ethers";
import KeyValueStorage from "keyvaluestorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { appStyles } from "./styles";
import { DEFAULT_TEST_CHAINS, DEFAULT_RELAY_PROVIDER } from "./constants";

declare const global: { HermesInternal: null | {} };

const MNEMONIC_KEY = "MNEMONIC";

const App = () => {
  const [chains] = useState(DEFAULT_TEST_CHAINS);
  const [mnemonic, setMnemonic] = useState<string | undefined>(undefined);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    const initMnemonic = async () => {
      let _mnemonic = await AsyncStorage.getItem(MNEMONIC_KEY);
      if (!_mnemonic) {
        _mnemonic = utils.entropyToMnemonic(crypto.randomBytes(32));
        await AsyncStorage.setItem(MNEMONIC_KEY, _mnemonic);
      }
      setMnemonic(_mnemonic);
    };
    initMnemonic();
  }, []);

  useEffect(() => {
    const initWallet = async () => {
      console.log(`Starting Wallet...`);
      try {
        const storage = new KeyValueStorage({
          asyncStorage: AsyncStorage as any,
        });
        const _wallet = await Wallet.init({
          chains,
          storage,
          mnemonic,
        });
        console.log("Wallet started!");
        setWallet(_wallet);
      } catch (e) {
        console.log("Failed to start Wallet!");
        console.error(e);
      }
    };
    initWallet();
  }, [chains, mnemonic]);

  useEffect(() => {
    const initClient = async () => {
      console.log(`Starting Client...`);
      try {
        const _client = await Client.init({
          relayProvider: DEFAULT_RELAY_PROVIDER,
          storageOptions: {
            asyncStorage: AsyncStorage as any,
          },
        });
        console.log("Client started!");
        setClient(_client);
      } catch (e) {
        console.log("Failed to start Client!");
        console.error(e);
      }
    };
    initClient();
  }, [wallet]);

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
                {client ? "Ready" : "Loading..."}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
