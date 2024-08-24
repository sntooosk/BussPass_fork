import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../routes/types';
import { styles } from './styles';

export default function TelaPrincipal() {
  const { navigate } = useNavigation<propsStack>();

  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <Text style={styles.title}>BussPass</Text>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
      </View>

   
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Saldo</Text>
        <Text style={styles.balanceAmount}>$ 1.234</Text>
        <Text style={styles.cardName}>Cartão</Text>
        <Text style={styles.bankName}>Mobank</Text>
      </View>

  
      <View style={styles.actionRow}>
        <Pressable
          style={styles.actionButton}
          // onPress={() => navigate("Transferencia")}
        >
          <MaterialIcons name="swap-horiz" size={24} color="#4E3D8D" />
          <Text style={styles.actionText}>Transferência</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          // onPress={() => navigate("Pagamento")}
        >
          <MaterialIcons name="payment" size={24} color="#4E3D8D" />
          <Text style={styles.actionText}>Pagamento</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => navigate("Recarga")}
        >
          <MaterialIcons name="attach-money" size={24} color="#4E3D8D" />
          <Text style={styles.actionText}>Recarga</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => navigate("AddCard")}
        >
          <MaterialIcons name="add-circle" size={24} color="#4E3D8D" />
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
            { id: 1, name: 'Netflix', amount: '$12', icon: 'movie', color: '#E50914' },
            { id: 2, name: 'Paypal', amount: '$10', icon: 'paypal', color: '#003087' },
            { id: 3, name: 'Paylater', amount: '$2', icon: 'credit-card', color: '#4E3D8D' },
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
