import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SessionTypes, AppMetadata } from "@walletconnect/types";

import Button from "../components/Button";

import { Context } from "../context";
import Metadata from "../components/Metadata";
import Blockchain from "../components/Blockchain";

interface RequestProps {
  request: SessionTypes.RequestEvent;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

const Request = (props: RequestProps) => {
  const { client } = useContext(Context);

  const { onApprove, onReject } = props;
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<AppMetadata | undefined>(undefined);
  const { topic, request, chainId } = props.request;

  useEffect(() => {
    const getMetadata = async () => {
      setLoading(true);
      try {
        if (typeof client === "undefined") {
          return;
        }
        const session = await client.session.get(topic);
        setLoading(false);
        setMetadata(session.peer.metadata);
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };
    getMetadata();
  }, [client, topic]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"JSON-RPC Request"}</Text>
      {loading ? (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>{"Loading..."}</Text>
        </View>
      ) : metadata ? (
        <>
          <Metadata metadata={metadata} />
          {chainId && <Blockchain chainId={chainId} />}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{"Method"}</Text>
            <Text style={styles.sectionDescription}>{request.method}</Text>
            <Text style={styles.sectionTitle}>{"Params"}</Text>
            <Text style={styles.sectionDescription}>
              {JSON.stringify(request.params)}
            </Text>
          </View>
          <View style={styles.actions}>
            <Button text="Reject" color="red" onPress={() => onReject()} />
            <Button text="Approve" color="green" onPress={() => onApprove()} />
          </View>
        </>
      ) : (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            {"Something went wrong"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    marginTop: 100,
    margin: 20,
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

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Request;
