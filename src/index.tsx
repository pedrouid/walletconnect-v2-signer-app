import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "./context";

import Home from "./screens/Home";
import Scanner from "./screens/Scanner";

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

function App() {
  return (
    <Provider>
      <NavigationContainer theme={Theme}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: "Accounts" }}
          />
          <Tab.Screen name="Scanner" component={Scanner} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
