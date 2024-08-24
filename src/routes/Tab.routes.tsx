
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Settings, StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import TelaPrincipal from "../screens/TelaPrincipal";
import Carteira from "../screens/Carteira";
import Notificacao from "../screens/Notificacao";
import Configuracao from "../screens/Profile";
import Relatorio from "../screens/Relatorio";
import Profile from "../screens/Profile";
import AddCard from "src/screens/AddCard";


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
          name="TelaPrincipal"
          component={TelaPrincipal}
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
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="user"
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
