import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from 'src/routes/types';

export default function AddCard() {
    const { navigate } = useNavigation<propsStack>();
    return (
        <View style={styles.container}>
        
            <View style={styles.header}>
                <Pressable 
                    onPress={() => navigate("Home")}>
                    <FontAwesome name="arrow-left" size={24} color="#4E3D8D" />
                </Pressable>
            </View>


            <Text style={styles.title}>Add card</Text>


            <Pressable
            onPress={() => navigate("CardDetails")}>
            <View style={styles.card}>
                <View style={styles.cardIcon}>

                    <View style={styles.iconPlaceholder}>
                        <FontAwesome name="credit-card" size={24} color="#FFD700" />
                    </View>
                </View>
                <Text style={styles.cardLabel}>BussPass</Text>
            </View>
            </Pressable>

            {/* Texto descritivo */}
            <Text style={styles.description}>Clique acima para ver os detalhes do cartao</Text>
        </View>
    );
};
