import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SearchResults from './screens/SearchResults';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
          headerShown: true, // Change to true for visible headers globally
          headerStyle: { backgroundColor: '#D32F2F' }, // Customize header style globally
          headerTintColor: '#fff', // Customize text color of header elements
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home', // Custom header title for Home screen
            headerLeft: null, // Remove the back button on the Home screen
          }} 
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen} 
          options={{ title: 'Search Movies' }} // Custom title for the Search screen
        />
        <Stack.Screen 
          name="SearchResults" 
          component={SearchResults} 
          options={{ title: 'Search Results' }} // Custom title for Search Results screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register the main app component for Expo
registerRootComponent(App);
