import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_URL, socket } from "../socket";

const USER_ID = "user123";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();

    socket.emit("join", USER_ID);

  socket.on("budgetExceeded", (notification) => {
  setNotifications((prev) => [notification, ...prev]);
});

    return () => {
      socket.off("budgetExceeded");
    };
  }, []);

  async function fetchNotifications() {
    try {
      const response = await axios.get(`${API_URL}/notifications/${USER_ID}`);
      setNotifications(response.data.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load notifications");
    }
  }

  async function markAsRead(id) {
    try {
      const response = await axios.put(
        `${API_URL}/notifications/${USER_ID}/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? response.data.data : item))
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update notification");
    }
  }

  async function deleteNotification(id) {
    try {
      await axios.delete(`${API_URL}/notifications/${USER_ID}/${id}`);

      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete notification");
    }
  }

  function renderItem({ item }) {
    return (
      <View style={[styles.card, item.isRead && styles.readCard]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.status}>{item.isRead ? "Read" : "Unread"}</Text>

        <View style={styles.buttonRow}>
          {!item.isRead && (
            <TouchableOpacity
              style={styles.readButton}
              onPress={() => markAsRead(item.id)}
            >
              <Text style={styles.buttonText}>Mark as Read</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteNotification(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  readCard: {
    backgroundColor: "#eeeeee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 6,
    fontSize: 14,
  },
  status: {
    marginTop: 6,
    fontSize: 12,
    color: "#555",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  readButton: {
    backgroundColor: "#2f80ed",
    padding: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#eb5757",
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    color: "#777",
  },
});