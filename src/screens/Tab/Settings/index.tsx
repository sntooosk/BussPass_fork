import { Pressable, Text, View } from "react-native";
import { styles } from "../../../utils/styles";
import { useAuth } from "../../../context/AuthContext";
import CadDados from "../../cadDados";

export default function Configuracao() {


    const { signOut } = useAuth();

    const userLogout = () => {
        signOut();
      };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Configurações </Text>
            <Pressable style={styles.formButton}
                onPress={userLogout}
            >
                <Text style={styles.textButton}> Logout </Text>
            </Pressable>

            <Pressable 
            style = {styles.formButton}
            onPress={CadDados} >
                <Text style = {styles.textButton}> Cadastrar Dados </Text>
            </Pressable>
        </View>
    )
}