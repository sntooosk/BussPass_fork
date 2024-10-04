import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";
import { db } from "src/utils/firebase";
import {
  asyncGetUserProfile,
  asyncSetUserProfile,
} from "src/utils/storage/UserStorage";
import { styles } from "./styles";
import { propsStack } from "src/routes/types";

export default function Home() {
  const { navigate } = useNavigation<propsStack>();
  const auth = getAuth();
  const usuario: User | null = auth.currentUser;

  const [foto, setFoto] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [mostrarSaldo, setMostrarSaldo] = useState<boolean>(false);
  const [transacoes, setTransacoes] = useState([]);

  const buscarDadosUsuario = useCallback(async () => {
    if (usuario) {
      const usuarioRef = doc(collection(db, "usuarios"), usuario.uid);
      const usuarioDoc = await getDoc(usuarioRef);
      if (usuarioDoc.exists()) {
        const dadosUsuario = usuarioDoc.data();
        await asyncSetUserProfile(dadosUsuario);
        const perfilUsuario = await asyncGetUserProfile();
        setFoto(perfilUsuario?.photo || null);
      }
    }
  }, [usuario]);

  const buscarSaldoCartao = useCallback(() => {
    if (usuario) {
      const cartaoRef = doc(collection(db, "cardsDados"), usuario.uid);
      onSnapshot(cartaoRef, (cartaoDoc) => {
        if (cartaoDoc.exists()) {
          const dadosCartao = cartaoDoc.data();
          setSaldo(dadosCartao?.saldo ? parseFloat(dadosCartao.saldo) : 0);
        } else {
          setSaldo(0);
        }
      });
    }
  }, [usuario]);

  const buscarTransacoes = useCallback(() => {
    if (usuario) {
      const transacoesRef = doc(collection(db, "transacoes"), usuario.uid);
      onSnapshot(transacoesRef, (transacoesDoc) => {
        if (transacoesDoc.exists()) {
          const dadosTransacoes = transacoesDoc.data();
          const listaTransacoes = dadosTransacoes?.transacoes || [];
          setTransacoes(listaTransacoes);
        } else {
          setTransacoes([]);
        }
      });
    }
  }, [usuario]);

  const atualizarDados = async () => {
    setCarregando(true);
    await Promise.all([
      buscarDadosUsuario(),
      buscarSaldoCartao(),
      buscarTransacoes(),
    ]);
    setCarregando(false);
  };

  const alternarVisibilidadeSaldo = () => {
    setMostrarSaldo((prev) => !prev);
  };

  useEffect(() => {
    atualizarDados();
  }, [buscarDadosUsuario, buscarSaldoCartao, buscarTransacoes]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={carregando} onRefresh={atualizarDados} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>BussPass</Text>
        <Pressable onPress={() => navigate("Profile")}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="person" size={40} color="gray" />
          )}
        </Pressable>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Saldo</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            {mostrarSaldo
              ? `R$ ${saldo !== null ? saldo.toFixed(2) : "0,00"}`
              : "****"}
          </Text>
          <Pressable onPress={alternarVisibilidadeSaldo}>
            <MaterialIcons
              name={mostrarSaldo ? "visibility-off" : "visibility"}
              size={24}
              color="#fff"
              style={styles.saldoIcon}
            />
          </Pressable>
        </View>

        <Text style={styles.cardName}>Cartão</Text>
        <Text style={styles.bankName}>BussPass</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={styles.actionButton}
          onPress={() => navigate("CardDetails")}
        >
          <MaterialIcons name="payment" size={24} color="#fff" />
          <Text style={styles.actionText}>Cartão</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => navigate("Recarga")}
        >
          <MaterialIcons name="attach-money" size={24} color="#fff" />
          <Text style={styles.actionText}>Recarga</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => navigate("AddCard")}
        >
          <MaterialIcons name="add-circle" size={24} color="#fff" />
          <Text style={styles.actionText}>Add Card</Text>
        </Pressable>
      </View>

      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Última transação</Text>
          <Pressable
            style={styles.viewStatementButtonContainer}
            onPress={() => navigate("Extrato")}
          >
            <Text style={styles.viewStatementButton}>Ver Extrato</Text>
          </Pressable>
        </View>
        {transacoes.length > 0 ? (
          transacoes.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <MaterialIcons name="attach-money" size={24} color="#fff" />
                <Text style={styles.transactionName}>{item.nome}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.tipo === "saida" ? "red" : "green" },
                  ]}
                >
                  {item.valor}
                </Text>
                <Text style={styles.transactionDate}>{item.data}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactionsText}>
            Nenhuma transação disponível
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
