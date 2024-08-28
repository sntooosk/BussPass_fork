
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./types";
import SignIn from "src/screens/SignIn";
import SignUp from "src/screens/signUp";
import ReplacePass from "src/screens/ReplacePass";
import AddCard from "src/screens/Card/AddCard";
import Profile from "src/screens/Profile";
import Home from "src/screens/Home";

const { Screen, Navigator } =
  createNativeStackNavigator<propsNavigationStack>();

export default function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>

      <Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Screen
        name="ReplacePass"
        component={ReplacePass}
        options={{ headerShown: false, gestureEnabled: false }}
      />
     
    </Navigator>
  );
}
