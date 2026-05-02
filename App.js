import { View, Alert } from "react-native";
import { useEffect } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import { socket, USER_ID } from "./socket";
import store from "./store";
import BannerSlider from "./components/UI/BannerSlider";

import {
  AllExpensesScreen,
  ManageExpenseScreen,
  RecentExpensesScreen,
  MyProfileScreen,
  HelpCenterScreen,
  MyAccountScreen,
  CurrencySettingScreen,
  NotificationScreen,
  SetBudgetScreen,
} from "./screens";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function SocketListener() {
  useEffect(() => {
    socket.emit("join", USER_ID);

    socket.on("budgetExceeded", (notification) => {
      Alert.alert(notification.title, notification.message);
    });

    return () => {
      socket.off("budgetExceeded");
    };
  }, []);

  return null;
}

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.tobago,
          height: 60,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#B9B2FF",
        tabBarInactiveTintColor: "#ffffff",
      }}
      sceneContainerStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpensesScreen}
        options={{
          title: "Recent",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={focused ? 26 : 20}
              color={color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpensesScreen}
        options={{
          title: "All",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={focused ? 26 : 20}
              color={color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={focused ? 26 : 20}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function HomeWithBanner() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BottomTabs />
      </View>
      <BannerSlider />
    </View>
  );
}

function EmptyDrawerScreen() {
  return null;
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.tobago },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            color="white"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        drawerStyle: {
          backgroundColor: "#ffffff",
        },
        drawerActiveTintColor: "#B9B2FF",
        drawerInactiveTintColor: "#333",
      })}
    >
      <Drawer.Screen
        name="MainTabs"
        component={HomeWithBanner}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "RecentExpenses";

          const titleMap = {
            RecentExpenses: "Recent Expenses",
            AllExpenses: "All Expenses",
            MyProfile: "Profile",
          };

          return {
            title: titleMap[routeName] || "Expense Tracker",
            drawerLabel: "Expenses",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          };
        }}
      />

      <Drawer.Screen
        name="DrawerMyAccount"
        component={EmptyDrawerScreen}
        listeners={({ navigation }) => ({
          drawerItemPress: (event) => {
            event.preventDefault();
            navigation.closeDrawer();
            navigation.navigate("MyAccount");
          },
        })}
        options={{
          drawerLabel: "My Account",
          title: "My Account",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="DrawerCurrencySetting"
        component={EmptyDrawerScreen}
        listeners={({ navigation }) => ({
          drawerItemPress: (event) => {
            event.preventDefault();
            navigation.closeDrawer();
            navigation.navigate("CurrencySetting");
          },
        })}
        options={{
          drawerLabel: "Currency Setting",
          title: "Currency Setting",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="DrawerSetBudget"
        component={EmptyDrawerScreen}
        listeners={({ navigation }) => ({
          drawerItemPress: (event) => {
            event.preventDefault();
            navigation.closeDrawer();
            navigation.navigate("SetBudget");
          },
        })}
        options={{
          drawerLabel: "Set Budget",
          title: "Set Budget",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="DrawerNotifications"
        component={EmptyDrawerScreen}
        listeners={({ navigation }) => ({
          drawerItemPress: (event) => {
            event.preventDefault();
            navigation.closeDrawer();
            navigation.navigate("Notifications");
          },
        })}
        options={{
          drawerLabel: "Notifications",
          title: "Notifications",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="DrawerHelpCenter"
        component={EmptyDrawerScreen}
        listeners={({ navigation }) => ({
          drawerItemPress: (event) => {
            event.preventDefault();
            navigation.closeDrawer();
            navigation.navigate("HelpCenter");
          },
        })}
        options={{
          drawerLabel: "Help Center",
          title: "Help Center",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <SocketListener />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.tobago },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
              contentStyle: { backgroundColor: GlobalStyles.colors.vanillaIce },
            }}
          >
            <Stack.Screen
              name="DrawerRoot"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageExpenseScreen"
              component={ManageExpenseScreen}
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                title: "Manage Expense",
              }}
            />

            <Stack.Screen
              name="MyAccount"
              component={MyAccountScreen}
              options={{ title: "My Account" }}
            />

            <Stack.Screen
              name="CurrencySetting"
              component={CurrencySettingScreen}
              options={{ title: "Currency Setting" }}
            />

            <Stack.Screen
              name="SetBudget"
              component={SetBudgetScreen}
              options={{ title: "Set Budget" }}
            />

            <Stack.Screen
              name="Notifications"
              component={NotificationScreen}
              options={{ title: "Notifications" }}
            />

            <Stack.Screen
              name="HelpCenter"
              component={HelpCenterScreen}
              options={{ title: "Help Center" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}