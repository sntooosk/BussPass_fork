import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc } from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { db } from "src/utils/firebase";
import Transaction from "src/models/Transaction";
import { styles } from "./styles";
import { propsStack } from "src/routes/types";

export default function TelaExtrato() {
  const { navigate } = useNavigation<propsStack>();
  const auth = getAuth();
  const usuario: User | null = auth.currentUser;

  const [transacoes, setTransacoes] = useState<Transaction[]>([]);

  const buscarTransacoes = useCallback(async () => {
    try {
      if (usuario) {
        const transacoesRef = doc(collection(db, "transacoes"), usuario.uid);
        const transacoesDoc = await getDoc(transacoesRef);

        if (transacoesDoc.exists()) {
          const dadosTransacoes = transacoesDoc.data();
          const transacoesUsuario = dadosTransacoes?.transacoes || [];
          setTransacoes(transacoesUsuario);
        } else {
          setTransacoes([]);
        }
      }
    } catch (erro) {
      Alert.alert("Erro", "Houve um erro ao carregar o extrato de transações.");
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario) {
      buscarTransacoes();
    }
  }, [usuario, buscarTransacoes]);

  const obterCorValor = (valor: string) => {
    return parseFloat(valor.replace("R$", "")) < 0
      ? styles.negativeAmount
      : styles.positiveAmount;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigate("Home")}
        >
          <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
        </TouchableOpacity>
        <Text style={styles.title}>Extrato</Text>
        <MaterialIcons name="receipt" size={30} color="#fff" />
      </View>

      <ScrollView style={styles.transactionContainer}>
        <Text style={styles.sectionTitle}>Histórico de Transações</Text>

        {transacoes.length > 0 ? (
          transacoes.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>{item.name}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text
                  style={[styles.transactionAmount, obterCorValor(item.amount)]}
                >
                  {item.amount}
                </Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>
            Nenhuma transação disponível
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
