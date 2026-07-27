import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import colors from '../constants/colors';
import { getSession } from '../services/storage';
import LoadingSpinner from '../components/LoadingSpinner';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MatkulListScreen from '../screens/MatkulListScreen';
import MatkulDetailScreen from '../screens/MatkulDetailScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Beranda: '🏠',
  Matkul: '📚',
  Progres: '📈',
  Profil: '👤',
};

function TabIcon({ label, focused }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{TAB_ICONS[label]}</Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '600' },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Tab.Screen name="Matkul" component={MatkulListScreen} options={{ title: 'Mata Kuliah' }} />
      <Tab.Screen name="Progres" component={ProgressScreen} options={{ title: 'Progres Belajar' }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      setInitialRoute(session ? 'MainTabs' : 'Login');
      setCheckingSession(false);
    }
    checkSession();
  }, []);

  if (checkingSession) {
    return <LoadingSpinner label="Memeriksa sesi login..." />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="MatkulDetail"
        component={MatkulDetailScreen}
        options={{
          title: '',
          headerStyle: { backgroundColor: colors.primary },
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
