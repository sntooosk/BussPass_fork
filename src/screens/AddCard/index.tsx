import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'src/utils/firebase';
import CardType from 'src/models/Card';
import { propsStack } from 'src/routes/types';
import { styles } from './styles';

export default function AdicionarCartao() {
    const { navigate } = useNavigation<propsStack>();

    const [detalhesCartao, setDetalhesCartao] = useState<CardType>({
        nomeCartao: '',
        numeroCartao: '',
        status: 'Ativo',
        validade: '',
        saldo: 0,
    });

    const [carregando, setCarregando] = useState<boolean>(false);

    const auth = getAuth();
    const usuario: User | null = auth.currentUser;

    useEffect(() => {
        const buscarDadosCartao = async () => {
            if (usuario) {
                try {
                    const cartaoRef = doc(collection(db, "cardsDados"), usuario.uid);
                    const cartaoSnap = await getDoc(cartaoRef);

                    if (cartaoSnap.exists()) {
                        const dadosCartao = cartaoSnap.data();
                        setDetalhesCartao({
                            nomeCartao: dadosCartao.nameCard || '',
                            numeroCartao: dadosCartao.numberCard || '',
                            status: dadosCartao.status || 'Ativo',
                            validade: dadosCartao.validCard || '',
                            saldo: dadosCartao.saldo || 0,
                        });
                    }
                } catch (erro) {
                    console.error("Erro ao buscar dados do cartão: ", erro);
                }
            }
        };

        buscarDadosCartao();
    }, [usuario]);

    const salvarCartao = async () => {
        try {
            setCarregando(true);

            if (!detalhesCartao.nomeCartao || !detalhesCartao.numeroCartao || !detalhesCartao.validade) {
                Alert.alert("Erro", "Preencha todos os campos.");
                setCarregando(false);
                return;
            }

            if (usuario) {
                const cartaoRef = doc(collection(db, "cardsDados"), usuario.uid);
                
                await setDoc(
                    cartaoRef,
                    {
                        nameCard: detalhesCartao.nomeCartao,
                        numberCard: detalhesCartao.numeroCartao,
                        validCard: detalhesCartao.validade,
                        status: detalhesCartao.status,
                        saldo: detalhesCartao.saldo
                    },
                    { merge: true }
                );

                Alert.alert("Sucesso", "Cartão adicionado com sucesso");
                setDetalhesCartao({
                    nomeCartao: '',
                    numeroCartao: '',
                    status: 'Ativo',
                    validade: '',
                    saldo: 0,
                });
            }
        } catch (erro) {
            Alert.alert(
                "Erro",
                "Houve um erro ao salvar os dados do cartão. Tente novamente mais tarde."
            );
        } finally {
            setCarregando(false);
        }
    };

    const alterarAnoValidade = (texto: string) => {
        const textoNumerico = texto.replace(/[^0-9]/g, '').slice(0, 8);

        if (textoNumerico.length === 8) {
            setDetalhesCartao((prevState) => ({
                ...prevState,
                validade: `${textoNumerico.slice(0, 4)}-${textoNumerico.slice(4, 8)}`
            }));
        } else {
            setDetalhesCartao((prevState) => ({
                ...prevState,
                validade: textoNumerico
            }));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigate("Home")}>
                    <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
                </Pressable>
            </View>

            <Text style={styles.title}>Adicionar Cartão</Text>

            <TextInput
                style={styles.formInput}
                placeholder="Nome do Cartão"
                placeholderTextColor={"white"}
                value={detalhesCartao.nomeCartao}
                onChangeText={(texto) => setDetalhesCartao({ ...detalhesCartao, nomeCartao: texto })}
            />

            <TextInput
                style={styles.formInput}
                placeholder="Número do Cartão"
                placeholderTextColor={"white"}
                value={detalhesCartao.numeroCartao}
                onChangeText={(texto) => setDetalhesCartao({ ...detalhesCartao, numeroCartao: texto.replace(/[^0-9]/g, '').slice(0, 8) })}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.formInput}
                placeholder="Ano de Validade (Ex: 2024-2030)"
                placeholderTextColor={"white"}
                value={detalhesCartao.validade}
                onChangeText={alterarAnoValidade}
                keyboardType="numeric"
                maxLength={9}
            />

            <Pressable style={styles.formButton} onPress={salvarCartao} disabled={carregando}>
                <Text style={styles.textButton}>{carregando ? "Salvando..." : "Adicionar Cartão"}</Text>
            </Pressable>

            <Text style={styles.description}>Preencha os campos acima para adicionar os dados do cartão.</Text>
        </View>
    );
}
