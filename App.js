import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import store from './store';
import BannerSlider from './components/UI/BannerSlider';

import {
  AllExpensesScreen,
  ManageExpenseScreen,
  RecentExpensesScreen,
  MyProfileScreen,
  HelpCenterScreen,
  MyAccountScreen,
  CurrencySettingScreen,
} from './screens';

import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


// BOTTOM TABS (NO HEADER)
function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false, // ✅ IMPORTANT (Drawer handles header)

        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.tobago,
          height: 60,
          paddingTop: 8,
          paddingBottom: 10,
        },

        tabBarActiveTintColor: "#B9B2FF",
        tabBarInactiveTintColor: "#ffffff",
      }}
      sceneContainerStyle={{
        backgroundColor: GlobalStyles.colors.vanillaIce,
      }}
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


// WRAPPER (Tabs + Banner)
function HomeWithBanner() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <BottomTabs />
      </View>

      {/* Banner outside navigator */}
      <BannerSlider />
    </View>
  );
}


// DRAWER (MAIN HEADER)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.tobago },
        headerTintColor: "white",
        headerTitleAlign: "center",

        // ✅ MENU BUTTON (works everywhere)
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
          backgroundColor: GlobalStyles.colors.vanillaIce,
        },

        drawerActiveTintColor: "#B9B2FF",
        drawerInactiveTintColor: "#333",
      })}
    >
      {/* MAIN ENTRY */}
      <Drawer.Screen
        name="RecentExpenses"
        component={HomeWithBanner}
        options={{
          title: "Recent Expenses",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{
          title: "Help Center",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          title: "My Account",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="CurrencySetting"
        component={CurrencySettingScreen}
        options={{
          title: "Currency Setting",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="logo-usd" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}


// MAIN APP
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.tobago },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
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
                presentation: 'modal',
                animation: 'slide_from_bottom',
                title: "Manage Expense",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}