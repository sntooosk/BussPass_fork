
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Home from "../screens/Home";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {

  return (
    <>
      <StatusBar
        barStyle="default"
      />
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
       
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="home"
                size={focused ? size + 10 : size}
                color={focused ? "#000" : "#999"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Navigator>
    </>
  );
}
