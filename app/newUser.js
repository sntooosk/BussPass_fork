import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Pressable, Text, View } from "react-native";
import { styles } from '../src/styles';
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase.config';
import { router } from 'expo-router';

export default function NewUser() {

    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userRePass, setUserRePass] = useState('');

    function newUser() {
        if (userMail === '' || userPass === '' || userRePass === '') {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        if (userPass !== userRePass) {
            alert('A senha e a confirmações não são iguais!');
            return;
        } else {
            createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((UserCredencial) => {
                const user = UserCredencial.user;
                alert('O usuário ' + userMail + 'foi criado. Faça o login');
                router.replace('/')
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            })
        }

    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
            <Text style={styles.formTitle}> Primeiro acesso </Text>

            <TextInput
                style={styles.formInput}
                placeholder="E-mail de usuário"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={userMail}
                onChangeText={setUserMail}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Senha de usuário"
                autoCapitalize="none"
                secureTextEntry
                value={userPass}
                onChangeText={setUserPass}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Repita a senha"
                autoCapitalize="none"
                secureTextEntry
                value={userRePass}
                onChangeText={setUserRePass}
            />

            <Pressable style = {styles.formButton}
                onPress={newUser}
            >
                <Text style = {styles.textButton}>
                    Cadastrar
                </Text>
            </Pressable>

        </View>
        </GestureHandlerRootView>
    );
}