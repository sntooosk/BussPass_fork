import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { getAuth } from 'firebase/auth';
import { db } from 'src/utils/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { propsStack } from 'src/routes/types';

export default function Recarga() {
    const { navigate } = useNavigation<propsStack>();
    const [saldo, setSaldo] = useState(''); 
    const [currentSaldo, setCurrentSaldo] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);

    const user = getAuth().currentUser;

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
        setLoading(true);
        const numericSaldo = parseFloat(saldo.replace(/^0+/, ''));
        if (isNaN(numericSaldo) || numericSaldo <= 0) {
            Alert.alert("Erro", "Preencha um saldo válido.");
        } else {
            setShowQRCode(true);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
                <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
            </TouchableOpacity>

            <Text style={styles.amount}>{`$${saldo || '0'}`}</Text>

            <View style={styles.numPad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num) => (
                    <TouchableOpacity
                        key={num}
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
