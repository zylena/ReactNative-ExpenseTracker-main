import { ExpenseOutput } from '../components';
import { useState } from 'react';


  export default function AllExpensesScreen() {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  return (
    <ExpenseOutput
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      setSelectedMonth={setSelectedMonth}
      setSelectedYear={setSelectedYear}
    />
  );
}