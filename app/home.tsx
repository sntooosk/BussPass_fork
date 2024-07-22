import { Text, View } from "react-native";
import { styles } from '../src/styles';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Pagina Inicial </Text>
        </View>
    )
}