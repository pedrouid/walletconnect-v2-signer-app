import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
import Wallet from "caip-wallet";
import Client, { CLIENT_EVENTS } from "@walletconnect/client";
import { SessionTypes } from "@walletconnect/types";

import KeyValueStorage from "keyvaluestorage";
import { formatJsonRpcResult, formatJsonRpcError } from "@json-rpc-tools/utils";
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
  request: SessionTypes.RequestEvent | undefined;
  setRequest: Dispatch<SessionTypes.RequestEvent | undefined>;
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
  const [request, setRequest] = useState<SessionTypes.RequestEvent | undefined>(
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
          controller: true,
          relayProvider: DEFAULT_RELAY_PROVIDER,
          metadata: DEFAULT_APP_METADATA,
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

        client.on(
          CLIENT_EVENTS.session.request,
          async (requestEvent: SessionTypes.RequestEvent) => {
            if (typeof wallet === "undefined") {
              throw new Error("Wallet is not initialized");
            }
            const chainId = requestEvent.chainId || chains[0];
            try {
              const [namespace] = chainId.split(":");
              const { data: jsonrpc } = await axios.get(
                `https://blockchain-api.xyz/api/jsonrpc/${namespace}`,
              );
              // TODO: needs improvement
              const requiresApproval = jsonrpc.methods.sign.includes(
                requestEvent.request.method,
              );
              if (requiresApproval) {
                setRequest(requestEvent);
                navigation.navigate("Modal");
              } else {
                const result = await wallet.request(requestEvent.request, {
                  chainId,
                });
                const response = formatJsonRpcResult(
                  requestEvent.request.id,
                  result,
                );
                await client.respond({ topic: requestEvent.topic, response });
              }
            } catch (e) {
              const response = formatJsonRpcError(
                requestEvent.request.id,
                e.message,
              );
              await client.respond({
                topic: requestEvent.topic,
                response,
              });
            }
          },
        );
      } catch (e) {
        console.log("Failed to subscribe Client!");
        console.error(e);
      }
    };
    subscribeClient();
  }, [client, wallet, chains]);

  async function onApprove() {
    if (typeof proposal !== "undefined") {
      try {
        if (typeof client === "undefined") {
          return;
        }
        const _accounts = accounts.filter((account) => {
          const chainId = account.split("@")[1];
          return proposal.permissions.blockchain.chains.includes(chainId);
        });
        const response = {
          state: { accounts: _accounts },
        };
        await client.approve({ proposal, response });
      } catch (e) {
        console.error(e);
      }
      setProposal(undefined);
    } else if (typeof request !== "undefined") {
      try {
        if (typeof client === "undefined") {
          return;
        }
        if (typeof wallet === "undefined") {
          return;
        }
        const chainId = request.chainId || chains[0];
        const result = await wallet.request(request.request, { chainId });
        const response = formatJsonRpcResult(request.request.id, result);
        await client.respond({
          topic: request.topic,
          response,
        });
      } catch (e) {
        console.error(e);
      }
      setRequest(undefined);
    }
    navigation.goBack();
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
      setProposal(undefined);
    } else if (typeof request !== "undefined") {
      try {
        if (typeof client === "undefined") {
          return;
        }
        const response = formatJsonRpcError(
          request.request.id,
          "User Rejected Request",
        );
        await client.respond({
          topic: request.topic,
          response,
        });
      } catch (e) {
        console.error(e);
      }
      setRequest(undefined);
    }
    navigation.goBack();
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
