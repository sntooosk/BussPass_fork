import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from 'src/utils/firebase';
import CardType from 'src/models/Card';
import { propsStack } from 'src/routes/types';

export default function DetalhesCartao() {
  const { navigate } = useNavigation<propsStack>();
  
  const [detalhesCartao, setDetalhesCartao] = useState<CardType>({
    nomeCartao: '',
    numeroCartao: '',
    status: 'Ativo',
    validade: '',
    saldo: 0,
  });

  const auth = getAuth();
  const usuario: User | null = auth.currentUser;

  useEffect(() => {
    const buscarDetalhesCartao = async () => {
      if (usuario) {
        try {
          const cartaoRef = doc(collection(db, "cardsDados"), usuario.uid);
          const documento = await getDoc(cartaoRef);

          if (documento.exists()) {
            const dados = documento.data();

            setDetalhesCartao({
              nomeCartao: dados?.nomeCartao || '',
              numeroCartao: dados?.numeroCartao ? `**** ${dados.numeroCartao.slice(-4)}` : '',
              status: dados?.status || 'Ativo',
              validade: dados?.validade || '',
              saldo: dados?.saldo || 0,
            });
          } else {
            Alert.alert("Erro", "Nenhum cartão encontrado.");
          }
        } catch (erro) {
          console.error("Erro ao buscar detalhes do cartão:", erro);
          Alert.alert("Erro", "Não foi possível buscar os detalhes do cartão.");
        }
      }
    };

    buscarDetalhesCartao();
  }, [detalhesCartao, usuario]);

  const deletarCartao = async () => {
    if (usuario) {
      try {
        const cartaoRef = doc(collection(db, "cardsDados"), usuario.uid);
        await deleteDoc(cartaoRef);
        Alert.alert("Sucesso", "Cartão deletado com sucesso.");
        
        setDetalhesCartao({
          nomeCartao: '',
          numeroCartao: '',
          status: '',
          validade: '',
          saldo: 0,
        });

      } catch (erro) {
        Alert.alert("Erro", "Erro ao deletar o cartão.");
        console.error(erro);
      }
    }
  };

  const confirmarDelecao = () => {
    Alert.alert(
      "Deseja excluir o seu cartão?",
      "Esta ação não pode ser desfeita.",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: deletarCartao }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigate("Home")}>
        <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
      </TouchableOpacity>

      <Text style={styles.title}>Cartão</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>{"BussPass"}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nome</Text>
          <Text style={styles.detailValue}>{detalhesCartao.nomeCartao}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Conta</Text>
          <Text style={styles.detailValue}>{detalhesCartao.numeroCartao}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status</Text>
          <Text style={styles.detailValue}>{detalhesCartao.status}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Validade</Text>
          <Text style={styles.detailValue}>{detalhesCartao.validade}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Saldo</Text>
          <Text style={styles.detailValue}>R$ {detalhesCartao.saldo.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={confirmarDelecao}>
        <Text style={styles.deleteButtonText}>Deletar Cartão</Text>
      </TouchableOpacity>
    </View>
  );
}
