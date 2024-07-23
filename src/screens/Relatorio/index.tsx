import { Pressable, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import { useAuth } from "../../context/AuthContext";

export default function Relatorio() {

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Relatorio </Text>
        </View>
    )
}