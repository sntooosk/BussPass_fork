import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../../routes/types';
import { styles } from './styles';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from 'src/utils/firebase';

export default function CardDetails() {
  const { navigate } = useNavigation<propsStack>();
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    bankName: 'BussPass',
    cardNumber: '',
    status: 'Active',
    validPeriod: '',
  });

  const auth = getAuth();
  const user: User | null = auth.currentUser;

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (user) {
        const cardRef = doc(collection(db, "cardsDados"), user.uid);
        const docSnap = await getDoc(cardRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCardDetails({
            cardName: data.nameCard || '',
            bankName: 'BussPass',
            cardNumber: data.numberCard ? `**** ${data.numberCard.slice(-4)}` : '',
            status: 'Active',
            validPeriod: data.validCard || '',
          });
        } else {
          Alert.alert("Erro", "Nenhum cartão encontrado.");
        }
      }
    };

    fetchCardDetails();
  }, [user]);

  // Função para deletar o cartão
  const deleteCard = async () => {
    if (user) {
      try {
        const cardRef = doc(collection(db, "cardsDados"), user.uid);
        await deleteDoc(cardRef);
        Alert.alert("Sucesso", "Cartão deletado com sucesso.");
        
        // Limpa os detalhes do cartão da tela
        setCardDetails({
          cardName: '',
          bankName: 'BussPass',
          cardNumber: '',
          status: '',
          validPeriod: '',
        });

        // Redireciona para a tela inicial ou outra tela desejada
        navigate("Home");
      } catch (error) {
        Alert.alert("Erro", "Erro ao deletar o cartão.");
      }
    }
  };

  // Função para exibir o alerta de confirmação
  const confirmDelete = () => {
    Alert.alert(
      "Deseja excluir o seu cartão?",
      "Esta ação não pode ser desfeita.",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: deleteCard }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
        <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
      </TouchableOpacity>

      {/* Título da tela */}
      <Text style={styles.title}>Cartão</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>{"BussPass"}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{cardDetails.cardName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bank</Text>
          <Text style={styles.detailValue}>{cardDetails.bankName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Account</Text>
          <Text style={styles.detailValue}>{cardDetails.cardNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={styles.detailValue}>{cardDetails.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Valid</Text>
          <Text style={styles.detailValue}>{cardDetails.validPeriod}</Text>
        </View>
      </View>

      {/* Botão de deletar */}
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Delete Card</Text>
      </TouchableOpacity>
    </View>
  );
}
