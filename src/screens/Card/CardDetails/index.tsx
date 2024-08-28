import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/types';
import { styles } from './styles';

export default function CardDetails() {
  const { navigate } = useNavigation<propsStack>();

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
        <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
      </TouchableOpacity>

      {/* Título da tela */}
      <Text style={styles.title}>Cartão</Text>

      {/* Cartão de exemplo */}
      <View style={styles.card}>
        <Text style={styles.cardText}>BussPass</Text>
      </View>

      {/* Informações do cartão */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>Santos</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bank</Text>
          <Text style={styles.detailValue}>BussPass</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Account</Text>
          <Text style={styles.detailValue}>**** 2158</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={styles.detailValue}>Active</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Valid</Text>
          <Text style={styles.detailValue}>2020 - 2025</Text>
        </View>
      </View>

      {/* Botão de deletar */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Card</Text>
      </TouchableOpacity>
    </View>
  );
}
