import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { ExpenseForm } from '../components';
import { useSelector } from 'react-redux';

export default function ManageExpenseScreen({ route, navigation }) {
  const id = route.params?.id;

  const expenses = useSelector((state) => state.expenses.expenses);
  const expense = id
    ? expenses.find((expense) => expense.id === id)
    : undefined;

  if (id && !expense) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text>Expense not found</Text>
        </View>
      );
    }
  // Setting the header title based on route parameters
  useLayoutEffect(() => {
      navigation.setOptions({
        title: id ? 'Edit expense' : 'Add New Expense',
      });
    }, [navigation, id]); 
  return (
    <View className="flex-1 p-5">
      <ExpenseForm id={id} defaultValues={expense ?? undefined} />
    </View>
  );
}
