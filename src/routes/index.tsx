
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import TabRoutes from "./Tab.routes";
import StackRoutes from "./Stack.routes";

export default function Router() {
  const { authData } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authData ? <TabRoutes /> : <StackRoutes   />}
    </NavigationContainer>
  );
}
