import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Pressable } from "react-native";
import { styles } from '../src/styles';
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useState } from "react";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../src/firebase.config';

export default function ReplacePass() {

    const [userMail, setUserMail] = useState('');
    const router = useRouter();

    function replacePass() {
        if (userMail !== '') {
            sendPasswordResetEmail(auth, userMail)
                .then(() => {
                    alert("Foi enviado um E-mail para: " + userMail + ". Solicitado a troca de senha");
                    router.replace('/');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert("Ops! Alguma coisa não deu certo. " + errorMessage + ". Tente novamente ou pressione voltar");
                    return;
                })

        } else {
            alert("Informe um E-mail válido para redefinir a senha");
            return;
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.formTitle}>
                    Redefinição de senha
                </Text>

                <TextInput
                    style={styles.formInput}
                    placeholder="Informe o E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={userMail}
                    onChangeText={setUserMail}
                />

                <Pressable style={styles.formButton}
                    onPress={replacePass}
                >
                    <Text style={styles.textButton}>
                        Enviar
                    </Text>
                </Pressable>
                <View style={styles.subContainer}>
                    <Pressable
                        onPress={() => router.push("/")}>
                        <Text> Voltar </Text>
                    </Pressable>
                </View>

            </View>
        </GestureHandlerRootView>
    );
}