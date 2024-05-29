// import 'react-native-reanimated'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginPage from './loginPage';
import HomePage from './homePage';
import AllertPage from './allertPage';
import HealthPage from './healthPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Acasa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sanatate') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'alert' : 'alert-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Acasa" component={HomePage} />
      <Tab.Screen name="Sanatate" component={HealthPage} />
      <Tab.Screen name="Profil" component={AllertPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs"  component={HomeTabs} options={{ headerShown: false, gestureEnabled : false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
