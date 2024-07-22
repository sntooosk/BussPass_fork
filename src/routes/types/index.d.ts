
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any; // Tela inicial


  // Tipos para as telas da Stack

  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Segunda tela de cadastro
  ReplacePass: undefined | any; // Tela de reset
  CadDados: undefined | any; // Primeira tela de cadastro

};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
