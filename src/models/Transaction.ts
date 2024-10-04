interface Transaction {
    id: string;
    name: string;
    amount: string;
    date: string;
    type: 'entrada' | 'saida';

  }
export default Transaction;