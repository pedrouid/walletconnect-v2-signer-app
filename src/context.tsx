import React, { createContext, useState, useEffect } from "react";

import Wallet from "caip-wallet";
import Client, { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";

import KeyValueStorage from "keyvaluestorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as navigation from "./navigation";
import {
  DEFAULT_RELAY_PROVIDER,
  DEFAULT_METHODS,
  DEFAULT_TEST_CHAINS,
  DEFAULT_APP_METADATA,
} from "./constants";

export type Dispatch<T = any> = React.Dispatch<React.SetStateAction<T>>;

export interface IContext {
  loading: boolean;
  chains: string[];
  accounts: string[];
  wallet: Wallet | undefined;
  client: Client | undefined;
  proposal: SessionTypes.Proposal | undefined;
  setProposal: Dispatch<SessionTypes.Proposal | undefined>;
  request: SessionTypes.PayloadEvent | undefined;
  setRequest: Dispatch<SessionTypes.PayloadEvent | undefined>;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

export const INITIAL_CONTEXT: IContext = {
  loading: false,
  chains: [],
  accounts: [],
  wallet: undefined,
  client: undefined,
  proposal: undefined,
  setProposal: () => {},
  request: undefined,
  setRequest: () => {},
  onApprove: async () => {},
  onReject: async () => {},
};

export const Context = createContext<IContext>(INITIAL_CONTEXT);

export const Provider = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chains] = useState<string[]>(DEFAULT_TEST_CHAINS);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [proposal, setProposal] = useState<SessionTypes.Proposal | undefined>(
    undefined,
  );
  const [request, setRequest] = useState<SessionTypes.PayloadEvent | undefined>(
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
          chains,
          storage,
        });
        const _accounts = await _wallet.getAccounts();
        setAccounts(_accounts);
        console.log("Wallet started!");
        setWallet(_wallet);
      } catch (e) {
        console.log("Failed to start Wallet!");
        console.error(e);
      }
    };
    initWallet();
  }, [chains]);

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
              if (chains.includes(chainId)) {
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
            navigation.navigate("Modal");
          },
        );
      } catch (e) {
        console.log("Failed to subscribe Client!");
        console.error(e);
      }
    };
    subscribeClient();
  }, [client, chains]);

  async function onApprove() {
    if (typeof proposal !== "undefined") {
      try {
        if (typeof client === "undefined") {
          return;
        }
        const response = {
          state: { accounts },
          metadata: DEFAULT_APP_METADATA,
        };
        await client.approve({ proposal, response });
      } catch (e) {
        console.error(e);
      }
      navigation.goBack();
      setProposal(undefined);
    } else if (typeof request !== "undefined") {
      // TODO: implement approve request
    }
  }

  async function onReject() {
    if (typeof proposal !== "undefined") {
      try {
        if (typeof client === "undefined") {
          return;
        }
        await client.reject({ proposal });
      } catch (e) {
        console.error(e);
      }
      navigation.goBack();
      setProposal(undefined);
    } else if (typeof request !== "undefined") {
      // TODO: implement approve request
    }
  }

  // Make the context object:
  const context: IContext = {
    loading,
    chains,
    accounts,
    wallet,
    client,
    proposal,
    setProposal,
    request,
    setRequest,
    onApprove,
    onReject,
  };

  // pass the value in provider and return
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export const { Consumer } = Context;
