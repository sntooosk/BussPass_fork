import { Pressable, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import { useAuth } from "../../context/AuthContext";

export default function Notificacao() {

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Notificação </Text>
        </View>
    )
}