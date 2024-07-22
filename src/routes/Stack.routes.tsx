
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./types";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/signUp";
import CadDados from "../screens/cadDados";
import ReplacePass from "../screens/ReplacePass";

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

      <Screen
        name="CadDados"
        component={CadDados}
        options={{ headerShown: false, gestureEnabled: false }}
      />

    </Navigator>
  );
}
