import { Pressable, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import { useAuth } from "../../context/AuthContext";

export default function Home() {

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Pagina Inicial </Text>
        </View>
    )
}