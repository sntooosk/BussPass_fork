import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFF',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    amountText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#4E3D8D',
      marginBottom: 20,
    },
    bankSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1F1F1',
      padding: 10,
      borderRadius: 10,
      marginBottom: 30,
      width: '80%',
      justifyContent: 'space-between',
    },
    bankText: {
      fontSize: 16,
      color: '#4E3D8D',
    },
    keyboard: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '80%',
    },
    key: {
      width: '30%',
      padding: 20,
      margin: 5,
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      borderRadius: 10,
    },
    keyText: {
      fontSize: 24,
      color: '#4E3D8D',
    },
    transferButton: {
      marginTop: 30,
      backgroundColor: '#4E3D8D',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
    },
    transferText: {
      fontSize: 18,
      color: '#FFF',
      fontWeight: 'bold',
    },
  });