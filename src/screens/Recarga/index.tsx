import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function Recarga() {
  const [amount, setAmount] = useState<string>("1200"); // Valor inicial mostrado na tela
  const navigation = useNavigation<propsStack>();

  const handleNumberPress = (number: string) => {
    setAmount((prev) => (prev === "0" ? number : prev + number));
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1) || "0");
  };

  const handleTransfer = () => {
    // Lógica para realizar a transferência
    console.log("Transferir", amount);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#4E3D8D" />
      </Pressable>

      <Text style={styles.amountText}>${amount}</Text>
      
      <View style={styles.bankSelector}>
        <Text style={styles.bankText}>Mobank</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#4E3D8D" />
      </View>

      {/* Teclado numérico personalizado */}
      <View style={styles.keyboard}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.key}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.keyText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.key} onPress={handleBackspace}>
          <MaterialIcons name="backspace" size={24} color="#4E3D8D" />
        </TouchableOpacity>
      </View>

      <Pressable style={styles.transferButton} onPress={handleTransfer}>
        <Text style={styles.transferText}>Transfer</Text>
      </Pressable>
    </View>
  );
}
