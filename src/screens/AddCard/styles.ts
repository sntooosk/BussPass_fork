import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    header: {
      alignSelf: 'flex-start',
      marginBottom: 24,
    },
    backButton: {
      padding: 8,
      backgroundColor: '#E0D6F3',
      borderRadius: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 24,
    },
    card: {
      width: 240,
      height: 160,
      borderRadius: 20,
      backgroundColor: '#4E3D8D',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 10,
    },
    cardIcon: {
      marginBottom: 16,
    },
    iconPlaceholder: {
      width: 40,
      height: 40,
      backgroundColor: '#4E3D8D',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    cardLabel: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFF',
    },
    description: {
      fontSize: 16,
      color: '#777',
      textAlign: 'center',
      marginHorizontal: 16,
    },
  });
  
  