import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { getFormattedDate } from '../../utils/date';

export default function ExpenseItem({ item, currency }) {
  if (!item) return null;

  const { id, title, price, date } = item;
  const navigation = useNavigation();
  const displayCurrency = currency || '₹';

  return (
    <View
      className="my-3 rounded-lg"
      style={{
        elevation: 4,
        backgroundColor: '#4B8F8C',
      }}
    >
      <Pressable
        className="px-4 py-3"
        android_ripple={{ color: '#dbe2ec', borderless: true }}
        onPress={() => navigation.navigate('ManageExpenseScreen', { id })}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white font-semibold">{title}</Text>
            <Text style={{ color: '#dbe2ec' }}>
              {getFormattedDate(new Date(date))}
            </Text>
          </View>

          <Text className="text-lg text-white font-semibold">
            {displayCurrency}{price.toFixed(2)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}