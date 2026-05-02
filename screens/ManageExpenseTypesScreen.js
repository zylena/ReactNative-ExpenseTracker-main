import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert, StyleSheet } from 'react-native';
import {
  getDBConnection,
  getExpenseTypes,
  addExpenseType,
  updateExpenseType,
  deleteExpenseType,
  createExpenseTypeTable,
} from '../utils/db-service';

export default function ManageExpenseTypesScreen() {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      setIsLoading(true);
      setInitError(null);
      const db = getDBConnection();
      await createExpenseTypeTable(db);
      await loadTypes();
    } catch (err) {
      console.error('Init error:', err);
      setInitError('Failed to initialize database');
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTypes() {
    try {
      const db = await getDBConnection();
      const data = await getExpenseTypes(db);
      setTypes(data);
    } catch (err) {
      console.error('Load types error:', err);
    }
  }

  async function handleAddOrUpdate() {
    if (!newType.trim()) return;

    try {
      const db = await getDBConnection();

      if (editingId !== null) {
        await updateExpenseType(db, editingId, newType.trim());
        setEditingId(null);
      } else {
        await addExpenseType(db, newType.trim());
      }

      setNewType('');
      await loadTypes();
    } catch (err) {
      Alert.alert('Error', 'Type already exists or an error occurred');
    }
  }

  async function handleDelete(id) {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const db = await getDBConnection();
            await deleteExpenseType(db, id);
            await loadTypes();
          } catch (err) {
            Alert.alert('Error', 'Could not delete type');
          }
        },
      },
    ]);
  }

  function startEdit(item) {
    setNewType(item.name);
    setEditingId(item.id);
  }

  function cancelEdit() {
    setNewType('');
    setEditingId(null);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (initError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{initError}</Text>
        <Pressable onPress={init} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Expense Types</Text>

      <TextInput
        value={newType}
        onChangeText={setNewType}
        placeholder="Enter new expense type..."
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <Pressable
          onPress={handleAddOrUpdate}
          style={[styles.addButton, { flex: editingId !== null ? 0.7 : 1 }]}
        >
          <Text style={styles.buttonText}>
            {editingId !== null ? 'Update Type' : 'Add Type'}
          </Text>
        </Pressable>

        {editingId !== null && (
          <Pressable onPress={cancelEdit} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={types}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.typeRow}>
            <Text style={styles.typeName}>{item.name}</Text>

            <View style={styles.actionButtons}>
              <Pressable onPress={() => startEdit(item)} style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
              </Pressable>

              <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No types yet. Add one above!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  addButton: {
    backgroundColor: '#7d71ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 0.3,
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  typeName: { fontSize: 16, flex: 1 },
  actionButtons: { flexDirection: 'row', gap: 12 },
  editButton: { padding: 6 },
  editText: { color: '#7d71ff', fontWeight: '600' },
  deleteButton: { padding: 6 },
  deleteText: { color: 'red', fontWeight: '600' },
  errorText: { color: 'red', marginBottom: 12 },
  retryButton: { backgroundColor: '#7d71ff', padding: 10, borderRadius: 8 },
  retryText: { color: 'white' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
});