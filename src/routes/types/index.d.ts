import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any;
  SignIn: undefined | any;
  SignUp: undefined | any;
  Profile: undefined | any;
  ReplacePass: undefined | any;
  AddCard: undefined | any;
  CardDetails: undefined | any;
  Recarga: undefined | any;
  Extrato: undefined | any;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
