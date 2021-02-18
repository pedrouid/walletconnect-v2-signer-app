import "./shim.js";
import { AppRegistry } from "react-native";
import crypto from "crypto";

import App from "./src";
import { name as appName } from "./app.json";

console.log(crypto.randomBytes(32).toString("hex"));

AppRegistry.registerComponent(appName, () => App);
