import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyAccountScreen({ navigation }) {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    id: '',
    gender: '',
  });

  // load saved data
  useEffect(() => {
    async function loadUser() {
      const data = await AsyncStorage.getItem('userData');
      if (data) setUser(JSON.parse(data));
    }
    loadUser();
  }, []);

  function updateField(field, value) {
    setUser((prev) => ({ ...prev, [field]: value }));
  }

  async function saveUser() {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>My Account</Text>

      <TextInput
        placeholder="Username"
        value={user.name}
        onChangeText={(text) => updateField('name', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        value={user.phone}
        onChangeText={(text) => updateField('phone', text)}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => updateField('email', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="ID"
        value={user.id}
        onChangeText={(text) => updateField('id', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Gender"
        value={user.gender}
        onChangeText={(text) => updateField('gender', text)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={saveUser}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7d71ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});