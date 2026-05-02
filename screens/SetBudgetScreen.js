import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { API_URL, USER_ID } from "../socket";

export default function SetBudgetScreen({ navigation }) {
  const [monthlyBudget, setMonthlyBudget] = useState("");

  async function saveBudget() {
    if (!monthlyBudget || Number(monthlyBudget) <= 0) {
      Alert.alert("Invalid Budget", "Please enter a valid monthly budget.");
      return;
    }

    try {
      await axios.post(`${API_URL}/budget`, {
        userId: USER_ID,
        monthlyBudget: Number(monthlyBudget),
      });

      Alert.alert("Success", "Monthly budget saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save monthly budget.");
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.headerIcon}>
            <Ionicons name="wallet-outline" size={30} color="#7d71ff" />
          </View>

          <Text style={styles.title}>Set Monthly Budget</Text>
          <Text style={styles.subtitle}>
            Set a monthly spending limit. You will receive a notification when your expenses exceed this budget.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Monthly Budget</Text>

          <View style={styles.inputBox}>
            <Text style={styles.currencyText}>RM</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#9aa7b8"
              value={monthlyBudget}
              keyboardType="numeric"
              onChangeText={setMonthlyBudget}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveBudget}>
            <Text style={styles.saveButtonText}>Save Budget</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    backgroundColor: "#ffffff",
  },
  headerCard: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#f4f6fb",
    borderWidth: 1,
    borderColor: "#e1e6f1",
    marginBottom: 18,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e8edf5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2F3A56",
  },
  subtitle: {
    fontSize: 13,
    color: "#8c99ad",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },
  formCard: {
    borderRadius: 24,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#edf1f8",
    padding: 16,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#556b89",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputBox: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#e8edf5",
    borderWidth: 1,
    borderColor: "#d5dce8",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  currencyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#7d71ff",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#556b89",
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 22,
  },
  saveButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#7d71ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});