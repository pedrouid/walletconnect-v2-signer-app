import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Wallet, { getChainConfig } from "caip-wallet";
import Client, { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";

import KeyValueStorage from "keyvaluestorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_RELAY_PROVIDER,
  DEFAULT_METHODS,
  DEFAULT_CHAIN,
  DEFAULT_APP_METADATA,
} from "../constants";

import Proposal from "../components/Proposal";
import Scanner from "../components/Scanner";

declare const global: { HermesInternal: null | {} };

const Home = () => {
  const [scanner, setScanner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [proposal, setProposal] = useState<SessionTypes.Proposal | undefined>(
    undefined,
  );

  useEffect(() => {
    const initWallet = async () => {
      console.log(`Starting Wallet...`);
      try {
        const storage = new KeyValueStorage({
          asyncStorage: AsyncStorage as any,
        });
        const _wallet = await Wallet.init({
          chains: [DEFAULT_CHAIN],
          storage,
        });
        const _accounts = await _wallet.getAccounts(DEFAULT_CHAIN);
        setAccounts(_accounts);
        console.log("Wallet started!");
        setWallet(_wallet);
      } catch (e) {
        console.log("Failed to start Wallet!");
        console.error(e);
      }
    };
    initWallet();
  }, []);

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
        setLoading(false);
      } catch (e) {
        console.log("Failed to start Client!");
        console.error(e);
      }
    };
    initClient();
  }, [wallet]);

  useEffect(() => {
    const subscribeClient = async () => {
      console.log("Subscribing Client...");
      try {
        if (typeof client === "undefined") {
          return;
        }
        client.on(
          CLIENT_EVENTS.session.proposal,
          (_proposal: SessionTypes.Proposal) => {
            if (typeof client === "undefined") {
              return;
            }
            console.log("EVENT", "session_proposal");
            const unsupportedChains = [];
            _proposal.permissions.blockchain.chains.forEach((chainId) => {
              if (chainId === DEFAULT_CHAIN) {
                return;
              }
              unsupportedChains.push(chainId);
            });
            if (unsupportedChains.length) {
              return client.reject({ proposal: _proposal });
            }
            const unsupportedMethods = [];
            _proposal.permissions.jsonrpc.methods.forEach((method) => {
              if (DEFAULT_METHODS.includes(method)) {
                return;
              }
              unsupportedMethods.push(method);
            });
            if (unsupportedMethods.length) {
              return client.reject({ proposal: _proposal });
            }
            setProposal(_proposal);
          },
        );
      } catch (e) {
        console.log("Failed to subscribe Client!");
        console.error(e);
      }
    };
    subscribeClient();
  }, [client]);

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
      setScanner(false);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  function toggleScanner() {
    setScanner(!scanner);
  }

  async function onApprove() {
    if (typeof client === "undefined") {
      return;
    }
    if (typeof proposal === "undefined") {
      return;
    }
    const response = { state: { accounts }, metadata: DEFAULT_APP_METADATA };
    await client.approve({ proposal, response });
  }

  async function onReject() {
    if (typeof client === "undefined") {
      return;
    }
    if (typeof proposal === "undefined") {
      return;
    }
    await client.reject({ proposal });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.content}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {loading ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>{"Loading..."}</Text>
              </View>
            ) : (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  {getChainConfig(DEFAULT_CHAIN).name}
                </Text>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={styles.sectionDescription}>
                  {accounts[0].split("@")[0]}
                </Text>
                <TouchableOpacity style={styles.button} onPress={toggleScanner}>
                  <Text style={styles.buttonText}>Pair</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {proposal && (
          <Proposal
            proposal={proposal}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}
        {scanner && <Scanner onRead={onRead} onCancel={toggleScanner} />}
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
