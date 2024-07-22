
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any; // Tela inicial


  // Tipos para as telas da Stack

  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Tela de cadastro
  ReplacePass: undefined | any; // Tela de reset

};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
