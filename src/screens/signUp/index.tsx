import { Alert, Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../utils/styles';
import { propsStack } from '../../routes/types';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');

    const { navigate } = useNavigation<propsStack>();
    const { signUp, isLoading } = useAuth();

    const newUser = async () => {
        if (password !== passwordRep) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            await signUp({ email, password });
            navigate("SignIn");
        } catch (error) { }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Primeiro acesso </Text>

            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usuário"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usuário"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Senha de usuário"
                autoCapitalize="none"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Repita a senha"
                autoCapitalize="none"
                secureTextEntry
                value={passwordRep}
                onChangeText={setPasswordRep}
            />

            <Pressable
                style={styles.formButton}
                onPress={newUser}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.textButton}>Cadastrar</Text>
                )}
            </Pressable>

            <Pressable
                style={styles.subButton}
                onPress={() => navigate("SignIn")}
            >
                <Text style={styles.subTextButton}>Voltar</Text>
            </Pressable>
        </View>
    );
}
