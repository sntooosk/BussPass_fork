import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#11181E',
    padding: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 16,
    color: '#4E3D8D',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  balanceCard: {
    backgroundColor: '#4E3D8D',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 18,
    color: '#DDD',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardName: {
    fontSize: 18,
    color: '#DDD',
    marginTop: 16,
  },
  bankName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
  },
  transactionContainer: {
    backgroundColor: '#11181E',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewAllText: {
    color: '#fff',
  },
  transactionList: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionIcon: {
    marginRight: 16,
  },
  transactionName: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#11181E',
    paddingVertical: 12,
    borderRadius: 20,
  },
});