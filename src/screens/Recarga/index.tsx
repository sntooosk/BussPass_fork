import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';
import { User, getAuth } from 'firebase/auth';
import { db } from 'src/utils/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import QRCode from 'react-native-qrcode-svg';

export default function Recarga() {
    const { navigate } = useNavigation<propsStack>();
    const [saldo, setSaldo] = useState<string>(''); 
    const [currentSaldo, setCurrentSaldo] = useState<number>(0); 
    const [loading, setLoading] = useState<boolean>(false);
    const [showQRCode, setShowQRCode] = useState<boolean>(false);

    const auth = getAuth();
    const user: User | null = auth.currentUser;

    useEffect(() => {
        const fetchSaldo = async () => {
            if (user) {
                const userRef = doc(collection(db, "cardsDados"), user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setCurrentSaldo(docSnap.data().saldo || 0);
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

            setShowQRCode(true);
        } catch (error) {
            Alert.alert("Erro", "Houve um erro ao salvar os dados. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentCompleted = async () => {
        if (user) {
            const userRef = doc(collection(db, "cardsDados"), user.uid);
            const transactionsRef = doc(collection(db, "transactions"), user.uid);
            const newSaldo = currentSaldo + parseFloat(saldo.replace(/^0+/, ''));

            const newTransaction = {
                id: String(new Date().getTime()),
                name: 'Recarga de Saldo',
                amount: `$${parseFloat(saldo).toFixed(2)}`,
                date: new Date().toLocaleDateString(),
                icon: 'attach-money',
            };

            try {
                await setDoc(
                    userRef,
                    { saldo: newSaldo },
                    { merge: true }
                );

                const transactionDoc = await getDoc(transactionsRef);

                if (transactionDoc.exists()) {
                    await setDoc(transactionsRef, {
                        transactions: [newTransaction, ...(transactionDoc.data()?.transactions || [])]
                    }, { merge: true });
                } else {
                    await setDoc(transactionsRef, {
                        transactions: [newTransaction]
                    });
                }

                Alert.alert("Sucesso", "Recarregado com sucesso");

                setSaldo(''); 
                setShowQRCode(false); 
                setCurrentSaldo(newSaldo); 

            } catch (error) {
                Alert.alert("Erro", "Houve um erro ao atualizar o saldo e a transação. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
                <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
            </TouchableOpacity>

            <Text style={styles.amount}>{`$${saldo || '0'}`}</Text>


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

            {showQRCode && (
                <View style={styles.qrContainer}>
                    <QRCode
                        value={`Valor: ${saldo}`}
                        size={200}
                    />
                    <View style={styles.qrButtons}>
                        <TouchableOpacity style={styles.qrButton} onPress={handlePaymentCompleted}>
                            <Text style={styles.qrButtonText}>Pago</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}
