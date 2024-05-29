import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginPage from "./loginPage";
import HomePage from "./homePage";
import AllertPage from "./profilePage";
import HealthPage from "./healthPage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfilePage from "./profilePage";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Acasa") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Sanatate") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "user" : "user-o";
          }

          if (route.name === "Acasa" || route.name === "Sanatate")
            return <Ionicons name={iconName} size={size} color={color} />;
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Acasa" component={HomePage} />
      <Tab.Screen name="Sanatate" component={HealthPage} />
      <Tab.Screen name="Profil" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
