import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import { db } from 'src/utils/firebase';

export default function Home() {
  const { navigate } = useNavigation<propsStack>();

  const auth = getAuth();
  const user: User | null = auth.currentUser;

  const [photo, setPhoto] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userRef = doc(collection(db, "users"), user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPhoto(userData.photo || null);
          }
        }
      } catch (error) {
        Alert.alert("Erro", "Houve um erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, [user]);
  return (
    <View style={styles.container}>
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
        <Text style={styles.balanceAmount}>$ 1.234</Text>
        <Text style={styles.cardName}>Cartão</Text>
        <Text style={styles.bankName}>BussPass</Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={styles.actionButton}
          // onPress={() => navigate("Transferencia")}
        >
          <MaterialIcons name="swap-horiz" size={24} color="#fff" />
          <Text style={styles.actionText}>Transferência</Text>
        </Pressable>

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
        onPress={() => navigate("AddCard")}
          style={styles.actionButton}
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
            { id: 1, name: 'Netflix', amount: '$12', icon: 'movie', color: '#fff' },
            { id: 2, name: 'Paypal', amount: '$10', icon: 'paypal', color: '#fff' },
            { id: 3, name: 'Paylater', amount: '$2', icon: 'credit-card', color: '#fff' },
          ].map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
