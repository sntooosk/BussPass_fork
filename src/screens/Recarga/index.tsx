import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';
import { User, getAuth } from 'firebase/auth';
import { db } from 'src/utils/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export default function TransferScreen() {
    const { navigate } = useNavigation<propsStack>();
    const [saldo, setSaldo] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const user: User | null = auth.currentUser;

    useEffect(() => {
        const fetchSaldo = async () => {
            if (user) {
                const userRef = doc(collection(db, "saldoCard"), "SU7KLsE7w56P4iOrgAC4");
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setSaldo(docSnap.data().saldo.toString() || '0');
                }
            }
        };
        fetchSaldo();
    }, [user]);

    const handlePress = (value: string) => {
        setSaldo(prev => prev + value);
    };

    const handleDelete = () => {
        setSaldo(prev => prev.slice(0, -1));
    };

    const handleSaveSaldo = async () => {
        try {
            setLoading(true);

            const cleanedSaldo = saldo.replace(/^0+/, '');
            const numericSaldo = parseFloat(cleanedSaldo);

            if (isNaN(numericSaldo) || numericSaldo <= 0) {
                Alert.alert("Erro", "Preencha um saldo válido.");
                setLoading(false);
                return;
            }

            if (user) {
                const userRef = doc(collection(db, "saldoCard"), user.uid);
                const docSnap = await getDoc(userRef);

                let currentSaldo = 0;
                if (docSnap.exists()) {
                    currentSaldo = docSnap.data().saldo || 0;
                }

                const newSaldo = currentSaldo + numericSaldo;

                await setDoc(
                    userRef,
                    {
                        saldo: newSaldo
                    },
                    { merge: true }
                );

                Alert.alert("Sucesso", "Saldo recarregado");
                setSaldo(''); // Limpar o campo de saldo após a recarga
            }
        } catch (error) {
            Alert.alert(
                "Erro",
                "Houve um erro ao salvar os dados. Tente novamente mais tarde."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
                <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
            </TouchableOpacity>

            <Text style={styles.amount}>${saldo}</Text>

            <Pressable style={styles.bankSelector}>
                <Text style={styles.bankText}>BussPass</Text>
                <FontAwesome name="chevron-down" size={16} color="#999" />
            </Pressable>

            <View style={styles.numPad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.numButton}
                        onPress={() => handlePress(num)}
                    >
                        <Text style={styles.numText}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.numButton} onPress={handleDelete}>
                    <FontAwesome name="trash" size={24} color="#4E3D8D" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.transferButton} onPress={handleSaveSaldo}>
                <Text style={styles.transferButtonText}>Recarregar</Text>
            </TouchableOpacity>
        </View>
    );
}
