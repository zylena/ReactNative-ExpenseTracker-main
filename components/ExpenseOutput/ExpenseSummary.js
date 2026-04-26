import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';

export default function ExpenseSummary({
  period,
  expenses,
  selectedMonth,
  selectedYear,
  showFilter,
  onFilterPress,
}) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.price,
    0
  );

  const monthNames = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return (
    <View
      className="flex-row justify-between items-center px-4 py-2 my-6 bg-white rounded-lg"
      style={{ elevation: 4 }}
    >
      {/* LEFT TEXT */}
      <Text className="font-bold">
        {period
          ? `Total expense in last ${period} days`
          : `Total expense (${monthNames[selectedMonth]} ${selectedYear})`}
      </Text>

      {/* RIGHT SIDE */}
      <View className="flex-row items-center">
        <Text className="font-bold text-lg mr-3">
          ₹{totalExpense.toFixed(2)}
        </Text>

        {showFilter && (
          <Pressable
            onPress={onFilterPress}
            style={{
              backgroundColor: '#ff4da6',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: 'white' }}>Filter</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}