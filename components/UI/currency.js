import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function useCurrency() {
    const [currency, setCurrency] = useState('₹');

    useFocusEffect(
        useCallback(() => {
            async function loadCurrency() {
                const savedCurrency = await AsyncStorage.getItem('currencySymbol');
                setCurrency(savedCurrency || '₹');
            }

            loadCurrency();
        }, [])
    );

    return currency;
}