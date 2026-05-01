import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { BannerSlider } from './components';

import store from './store';

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

function BottomTabComponent() {
  return (
    <View style={{ flex: 1 }}>
      {/* Screens (take full space above banner) */}
      <View style={{ flex: 1 }}>
        <BottomTab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.tobago },
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            tabBarStyle: {
              backgroundColor: GlobalStyles.colors.tobago,
              borderTopWidth: 0,
              height: 60,
              paddingTop: 8,
              paddingBottom: 10,
            },
            tabBarActiveTintColor: "#B9B2FF",
            tabBarInactiveTintColor: "#ffffff",
          }}
          sceneContainerStyle={{
            backgroundColor:"#ffffff",
          }}
        >
          <BottomTab.Screen
            name="RecentExpenses"
            component={RecentExpensesScreen}
            options={{
              title: "Recent Expenses",
              tabBarLabel: "Recent",
              tabBarLabelStyle: { fontSize: 12 },
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
              title: "All Expenses",
              tabBarLabel: "All",
              tabBarLabelStyle: { fontSize: 12 },
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
              title: "My Profile",
              tabBarLabel: "My Profile",
              tabBarLabelStyle: { fontSize: 12 },
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
      </View>

      {/* Advertisement Banner (auto-changing images) */}
      <BannerSlider />
    </View>
  );
}

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
              name="BottomTab"
              component={BottomTabComponent}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ManageExpenseScreen"
              component={ManageExpenseScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="HelpCenter"
              component={HelpCenterScreen}
              options={{ title: 'Help Center' }} 
            />
            <Stack.Screen
              name="MyAccount"
              component={MyAccountScreen}
              options={{ title: 'My Account' }}
            />

             <Stack.Screen
                name="CurrencySetting"
                component={CurrencySettingScreen}
                options={{ title: 'Currency Setting' }}
              />
          </Stack.Navigator>

        </NavigationContainer>
      </Provider>
    </>
  );
}
