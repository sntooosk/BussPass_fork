import { Pressable, Text, View } from "react-native";
import { styles } from "../../utils/styles";
import { useAuth } from "../../context/AuthContext";

export default function Home() {

    const { signOut } = useAuth();

    const userLogout = () => {
        signOut();
      };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Pagina Inicial </Text>
            <Pressable style={styles.formButton}
                onPress={userLogout}
            >
                <Text style={styles.textButton}> Logout </Text>
            </Pressable>
        </View>
    )
}