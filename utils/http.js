import axios from 'axios';

const BACKEND_URL = 'https://expensestracker-70e39-default-rtdb.asia-southeast1.firebasedatabase.app';

export async function storeExpenseToFirebase(expense) {
  const response = await axios.post(BACKEND_URL + '/expenses.json', expense);

  const id = response.data.name;

  return id;
}

export async function fetchExpensesFromFirebase() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const expenses = [];
  for (const key in response.data) {
    const expense = {
      id: key,
      ...response.data[key],
    };

    expenses.push(expense);
  }

  return expenses;
}

export async function updateExpenseInFirebase(id, expense) {
  await axios.put(BACKEND_URL + `/expenses/${id}.json`, expense);
}

export async function deleteExpenseFromFirebase(id) {
  await axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

export async function fetchFoodPicFromAPIHub() {
  try {
    const response = await fetch("https://foodish-api.com/api");

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();

    return data.image;
  } catch (error) {
    console.log("API error:", error);

    return null;
  }
}
