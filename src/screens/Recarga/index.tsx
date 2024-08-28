import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';

export default function TransferScreen() {
    const { navigate } = useNavigation<propsStack>();
    const [amount, setAmount] = useState('');

    const handleTransfer = () => {
        // Exibir o alerta
        Alert.alert('Recarregado com sucesso');
    
        // Zerar o valor digitado
        setAmount('');
      };

    const handlePress = (value: string) => {
        setAmount(prev => prev + value);
    };

    const handleDelete = () => {
        setAmount(prev => prev.slice(0, -1));
    };

    return (
        <View style={styles.container}>
       
            <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
                <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
            </TouchableOpacity>

           
            <Text style={styles.amount}>${amount}</Text>

           
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

        
            <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
                <Text style={styles.transferButtonText}>Recarregar</Text>
            </TouchableOpacity>
        </View>
    );
}