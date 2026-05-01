import { ExpenseOutput } from '../components';
import { useState } from 'react';
import useCurrency from '../components/UI/currency';

  export default function AllExpensesScreen() {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const currency = useCurrency();
  return (
    <ExpenseOutput
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      setSelectedMonth={setSelectedMonth}
      setSelectedYear={setSelectedYear}
      currency={currency} 
    />
  );
}