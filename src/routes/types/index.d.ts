
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any; // Tela inicial


  // Tipos para as telas da Stack

  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Segunda tela de cadastro
  ReplacePass: undefined | any; // Tela de reset
  CadDados: undefined | any; // Primeira tela de cadastro
  Carteira: undefined | any; // Tela da carteira
  Notificacao: undefined | any; // Tela das notificação
  Relatorio: undefined | any; // Tela do repositorio
  Configuracao: undefined | any; // Tela das configuração
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
