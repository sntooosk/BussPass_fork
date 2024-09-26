import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, Image, Alert, ScrollView, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import { db } from 'src/utils/firebase';
import { UserProfile } from 'src/models/UserProfile';
import { asyncGetUserProfile, asyncSetUserProfile } from 'src/utils/storage/UserStorage';

export default function Home() {
  const { navigate } = useNavigation<propsStack>();

  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [photo, setPhoto] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      if (user) {
        const userRef = doc(collection(db, "users"), user.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          await asyncSetUserProfile(userData);
          const userProfile = await asyncGetUserProfile();  
          setPhoto(userProfile?.photo || null);
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao carregar os dados do usuário.");
    }
  }, [user]);

  const fetchUserCardData = useCallback(async () => {
    try {
      if (user) {
        const cardRef = doc(collection(db, "cardsDados"), user.uid);
        const cardDoc = await getDoc(cardRef);
  
        if (cardDoc.exists()) {
          const cardData = cardDoc.data(); 
          setSaldo(cardData?.saldo ? parseFloat(cardData.saldo) : 0);
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Houve um erro ao carregar os dados do cartão.");
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    await fetchUserCardData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserCardData();
    }
  }, [user, fetchUserData, fetchUserCardData]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>BussPass</Text>
        <Pressable onPress={() => navigate('Profile')}>
          <Image
            source={{ uri: photo }}
            style={styles.profileImage}
          />
        </Pressable>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Saldo</Text>
        <Text style={styles.balanceAmount}>$ {saldo !== null ? saldo.toFixed(2) : '0.00'}</Text>
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
          <Pressable // onPress={() => navigate("")}
          >
            <Text style={styles.viewAllText}>Exibir tudo</Text>
          </Pressable>
        </View>

        <View style={styles.transactionList}>
          {[
            { id: 1, name: 'Jardim Imperial', amount: '$4', icon: 'movie', color: '#fff' },
            { id: 2, name: 'Alvinópolis', amount: '$4', icon: 'paypal', color: '#fff' },
            { id: 3, name: 'Portão', amount: '$4', icon: 'credit-card', color: '#fff' },
          ].map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
