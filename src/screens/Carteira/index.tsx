import { Pressable, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import { useAuth } from "../../context/AuthContext";

export default function Carteira() {

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Carteira </Text>
        </View>
    )
}