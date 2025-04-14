import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchResults from './screens/searchResults';
import HomeScreen from './screens/HomeScreen';
import { TMDB_API_KEY } from '@env';
import { registerRootComponent } from 'expo';

console.log("TMDB_API_KEY:", TMDB_API_KEY);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Search Results" component={SearchResults}/>
        { /* Add screen for film details later */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);