import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#F3F3F3",
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
