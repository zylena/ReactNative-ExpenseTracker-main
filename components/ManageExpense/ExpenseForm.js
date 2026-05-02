import { useState } from "react";
import { Text, View, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  addToExpenses,
  updateInExpenses,
  removeFromExpenses,
} from "../../store/expenses-slice";

import {
  storeExpense,
  updateExpense,
  deleteExpense,
} from "../../utils/http";

import ActionButtons from "./ActionButtons";
import Input from "./Input";
import DateInput from "./DateInput";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

export default function ExpenseForm({ id, defaultValues }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [inputValues, setInputValues] = useState({
    title: defaultValues ? defaultValues.title : "",
    price: defaultValues ? defaultValues.price.toString() : "",
    type: defaultValues ? defaultValues.type : "Food",
    date: defaultValues ? new Date(defaultValues.date) : new Date(),
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function inputValuesHandler(inputIdentifier, value) {
    setInputValues((prev) => ({
      ...prev,
      [inputIdentifier]: value,
    }));
  }

  async function submitHandler() {
    if (inputValues.title.trim() === "" || inputValues.price.trim() === "") {
      Alert.alert("Inputs Missing", "Please fill all fields", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (isNaN(+inputValues.price) || +inputValues.price <= 0) {
      Alert.alert("Invalid Price", "Price should be valid number", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    const expense = {
      title: inputValues.title,
      price: +inputValues.price,
      date: inputValues.date.toISOString(),
      type: inputValues.type,
    };

    setIsLoading(true);
    setError(null);

    if (id) {
      try {
        await updateExpense(id, expense);
        dispatch(updateInExpenses({ ...expense, id }));
        navigation.goBack();
      } catch (err) {
        console.log(err);
        setError("Couldn't update the expense");
      }
    } else {
      try {
        const expenseId = await storeExpense(expense);
        dispatch(addToExpenses({ ...expense, id: expenseId }));
        navigation.goBack();
      } catch (err) {
        console.log(err);
        setError("Couldn't add the expense");
      }
    }

    setIsLoading(false);
  }

  function deleteHandler() {
    Alert.alert("Delete Expense", "Are you sure you want to delete this expense?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          setError(null);

          try {
            await deleteExpense(id);
            dispatch(removeFromExpenses({id}));
            navigation.goBack();
          } catch (err) {
            console.log(err);
            setError("Couldn't delete the expense");
          }

          setIsLoading(false);
        },
      },
    ]);
  }

  if (error && !isLoading) {
    return <Error message={error} onConfirm={() => navigation.goBack()} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 p-5">
      <View className="my-4 p-5 bg-gray-600 rounded-lg">
        <Input
          label="Title"
          textInputConfig={{
            value: inputValues.title,
            onChangeText: inputValuesHandler.bind(this, "title"),
          }}
        />

        <Input
          label="Price"
          textInputConfig={{
            value: inputValues.price,
            onChangeText: inputValuesHandler.bind(this, "price"),
            keyboardType: "number-pad",
          }}
        />

        <View className="my-3">
          <Text className="text-white font-semibold mb-2">Type</Text>

          <View className="flex-row justify-between">
            {["Food", "Transport", "Shopping", "Bills"].map((t) => (
              <Pressable
                key={t}
                onPress={() => inputValuesHandler("type", t)}
                style={{
                  padding: 8,
                  borderRadius: 10,
                  backgroundColor: inputValues.type === t ? "#7d71ff" : "#ccc",
                }}
              >
                <Text style={{ color: "white" }}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <DateInput
          onChange={inputValuesHandler.bind(this, "date")}
          date={inputValues.date}
        />
      </View>

      <ActionButtons
        id={id}
        onSubmit={submitHandler}
        onDelete={deleteHandler}
      />
    </View>
  );
}