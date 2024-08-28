
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import StackRoutes from "./Stack.routes";
import StackIncRoutes from "./StackInc.routes";

export default function Router() {
  const { authData } = useAuth();

  return (
    <NavigationContainer independent={true}>
      {authData ? <StackIncRoutes /> : <StackRoutes   />}
    </NavigationContainer>
  );
}
