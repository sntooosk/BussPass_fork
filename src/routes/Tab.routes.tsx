
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Settings, StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Home from "../screens/Home";
import Carteira from "../screens/Tab/Carteira";
import Notificacao from "../screens/Tab/Notificacao";
import Configuracao from "../screens/Tab/Settings";
import Relatorio from "../screens/Tab/Relatorio";


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


        <Screen
          name="Carteira"
          component={Carteira}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="credit-card"
                size={focused ? size + 10 : size} color={focused
                  ? "#000" :
                  "#999"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />


        <Screen
          name="Notificacao"
          component={Notificacao}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="bell"
                size={focused ? size + 10 : size} color={focused
                  ? "#000" :
                  "#999"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />


        <Screen
          name="Relatorio"
          component={Relatorio}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="bar-chart"
                size={focused ? size + 10 : size} color={focused
                  ? "#000" :
                  "#999"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />


        <Screen
          name="Configuracao"
          component={Configuracao}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="settings"
                size={focused ? size + 10 : size} color={focused
                  ? "#000" :
                  "#999"}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

      </Navigator>
    </>
  );
}
