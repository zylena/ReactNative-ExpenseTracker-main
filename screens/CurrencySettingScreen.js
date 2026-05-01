import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currencyOptions = [
  {
    name: 'Malaysian Ringgit',
    code: 'MYR',
    symbol: 'RM',
  },
  {
    name: 'Indian Rupee',
    code: 'INR',
    symbol: '₹',
  },
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: '$',
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
  },
  {
    name: 'British Pound',
    code: 'GBP',
    symbol: '£',
  },
  {
    name: 'Japanese Yen',
    code: 'JPY',
    symbol: '¥',
  },
  {
    name: 'Chinese Yuan',
    code: 'CNY',
    symbol: '¥',
  },
  {
    name: 'Singapore Dollar',
    code: 'SGD',
    symbol: 'S$',
  },
];

export default function CurrencySettingScreen({ navigation }) {
  const [selectedCurrency, setSelectedCurrency] = useState('₹');

  useEffect(() => {
    async function loadCurrency() {
      const savedCurrency = await AsyncStorage.getItem('currencySymbol');
      setSelectedCurrency(savedCurrency || '₹');
    }

    loadCurrency();
  }, []);

  async function saveCurrency() {
    await AsyncStorage.setItem('currencySymbol', selectedCurrency);
    Alert.alert('Saved', 'Currency symbol has been updated.');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.headerIcon}>
            <Ionicons name="cash-outline" size={30} color="#7d71ff" />
          </View>

          <Text style={styles.title}>Currency Setting</Text>
          <Text style={styles.subtitle}>
            Select the currency symbol used in your expense records
          </Text>
        </View>

        <View style={styles.list}>
          {currencyOptions.map((currency) => {
            const isSelected = selectedCurrency === currency.symbol;

            return (
              <Pressable
                key={`${currency.code}-${currency.symbol}`}
                style={[
                  styles.currencyCard,
                  isSelected && styles.selectedCard,
                ]}
                onPress={() => setSelectedCurrency(currency.symbol)}
              >
                <View style={styles.currencyLeft}>
                  <View
                    style={[
                      styles.symbolCircle,
                      isSelected && styles.selectedSymbolCircle,
                    ]}
                  >
                    <Text
                      style={[
                        styles.symbolText,
                        isSelected && styles.selectedSymbolText,
                      ]}
                    >
                      {currency.symbol}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.currencyName,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {currency.name}
                    </Text>
                    <Text
                      style={[
                        styles.currencyCode,
                        isSelected && styles.selectedCode,
                      ]}
                    >
                      {currency.code}
                    </Text>
                  </View>
                </View>

                {isSelected && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#7d71ff"
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={saveCurrency}
        >
          <Text style={styles.saveButtonText}>Save Currency</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    backgroundColor: '#ffffff',
  },
  headerCard: {
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#f4f6fb',
    borderWidth: 1,
    borderColor: '#e1e6f1',
    marginBottom: 18,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e8edf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2F3A56',
  },
  subtitle: {
    fontSize: 13,
    color: '#8c99ad',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  list: {
    flex: 1,
  },
  currencyCard: {
    minHeight: 68,
    borderRadius: 18,
    backgroundColor: '#e8edf5',
    borderWidth: 1,
    borderColor: '#d5dce8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCard: {
    backgroundColor: '#f0eeff',
    borderColor: '#7d71ff',
  },
  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbolCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#edf1f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedSymbolCircle: {
    backgroundColor: '#7d71ff',
  },
  symbolText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#556b89',
  },
  selectedSymbolText: {
    color: '#ffffff',
  },
  currencyName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#556b89',
  },
  currencyCode: {
    fontSize: 12,
    color: '#8c99ad',
    marginTop: 3,
  },
  selectedText: {
    color: '#7d71ff',
  },
  selectedCode: {
    color: '#7d71ff',
  },
  saveButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#7d71ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7d71ff',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  saveButtonPressed: {
    backgroundColor: '#5B4BFF',
    transform: [{ scale: 0.98 }],
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});