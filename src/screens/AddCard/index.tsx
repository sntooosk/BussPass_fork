import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';

export default function AddCard() {
  const { navigate } = useNavigation<propsStack>();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
        </TouchableOpacity>
      </View>


      <Text style={styles.title}>Add card</Text>


      <View style={styles.card}>
        <View style={styles.cardIcon}>

          <View style={styles.iconPlaceholder}>
            <FontAwesome name="credit-card" size={24} color="#FFD700" />
          </View>
        </View>
        <Text style={styles.cardLabel}>VISA</Text>
      </View>

      <Text style={styles.description}>Add a new card on your wallet for easy life</Text>
    </View>
  );
};
