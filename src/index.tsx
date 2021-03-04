import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "./context";
import { navigationRef } from "./navigation";

import Home from "./screens/Home";
import Scanner from "./screens/Scanner";
import Modal from "./screens/Modal";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Theme = {
  dark: false,
  colors: {
    primary: "#000",
    background: "#fff",
    card: "#fff",
    text: "#000",
    border: "#000",
    notification: "#5a70b5",
  },
};

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: "Accounts" }}
      />
      <Tab.Screen name="Scanner" component={Scanner} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider>
      <NavigationContainer theme={Theme} ref={navigationRef}>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Main"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Modal" component={Modal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
