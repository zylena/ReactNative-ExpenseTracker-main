import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HelpCenterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>


        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="wallet-outline" size={20} color="#7d71ff" />
            <Text style={styles.cardTitle}>How to add an expense</Text>
          </View>
          <Text style={styles.cardText}>
            Go to the Recent or All Expenses page, then tap the add button to create a new expense record.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="create-outline" size={20} color="#7d71ff" />
            <Text style={styles.cardTitle}>How to edit an expense</Text>
          </View>
          <Text style={styles.cardText}>
            Open an existing expense item and choose the edit option to update the title, amount, date, or category.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="trash-outline" size={20} color="#7d71ff" />
            <Text style={styles.cardTitle}>How to delete an expense</Text>
          </View>
          <Text style={styles.cardText}>
            Open the expense details screen and tap delete to remove the selected record.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="help-circle-outline" size={20} color="#7d71ff" />
            <Text style={styles.cardTitle}>Common issues</Text>
          </View>
          <Text style={styles.cardText}>
            If your expenses do not appear, refresh the page or check your internet connection. If the app still does not work, restart it and try again.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color="#7d71ff" />
            <Text style={styles.cardTitle}>Contact Support</Text>
          </View>
          <Text style={styles.cardText}>
            Email: support@expensetracker.com{'\n'}
            Phone: +60 12-345 6789
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
        backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#556b89',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#7c8da6',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#e3e8f1',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#556b89',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6d7f99',
  },

});