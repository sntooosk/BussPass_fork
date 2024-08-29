
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./types";
import Home from "src/screens/Home";
import Profile from "src/screens/Profile";
import AddCard from "src/screens/Card/AddCard";
import CardDetails from "src/screens/Card/CardDetails";
import Recarga from "src/screens/Recarga"
import SignIn from "src/screens/SignIn";

const { Screen, Navigator } =
  createNativeStackNavigator<propsNavigationStack>();

export default function StackIncRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>

      <Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <Screen
        name="AddCard"
        component={AddCard}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <Screen
        name="CardDetails"
        component={CardDetails}
        options={{ headerShown: false, gestureEnabled: false }}
      />
       <Screen
        name="Recarga"
        component={Recarga}
        options={{ headerShown: false, gestureEnabled: false }}
      />

    </Navigator>
  );
}
