import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../utils/styles';
import { propsStack } from '../../routes/types';
import SignUp from "../signUp";

const insertMaskInCpf = (cpf: string): string => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export default function CadDados() {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");

    const navigation = useNavigation<propsStack>();
    const { cadDados, isLoading } = useAuth();

    const formatBirthdateInput = (inputValue: string): string => {
        const formattedValue = inputValue
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");
        return formattedValue;
    };

    const formatNumberInput = (inputValue: string): string => {
        const cleaned: string = inputValue.replace(/\D/g, "").slice(0, 11);
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
        if (match) {
            return `(${match[1] || ""})${match[2] || ""}-${match[3] || ""}`;
        }
        return inputValue;
    };

    //const handleSignUp = () => {
     //   cadDados({ name, lastName, dob, number, cpf });
   // };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}> Cadastrar Dados </Text>

            <TextInput
                style={styles.formInput}
                placeholder="Digite seu nome"
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Digite seu sobrenome"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
            />
            <TextInput
                style={styles.formInput}
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={(text) => setCpf(insertMaskInCpf(text))}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Digite sua data de nascimento"
                onChangeText={(text) => setDob(formatBirthdateInput(text))}
                value={dob}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.formInput}
                placeholder="Digite seu número de celular"
                onChangeText={(text) => setNumber(formatNumberInput(text))}
                value={number}
                keyboardType="phone-pad"
            />

            <Pressable
                style={styles.formButton}
                onPress={SignUp}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.textButton}>Próximo</Text>
                )}
            </Pressable>

            <Pressable
                style={styles.subButton}
                onPress={() => navigation.navigate("SignIn")}
            >
                <Text style={styles.subTextButton}>Voltar</Text>
            </Pressable>
        </View>
    );
}
