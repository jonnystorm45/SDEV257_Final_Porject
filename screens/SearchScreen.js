import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigation.navigate('SearchResults', { query });
    }
  };

  // Use useLayoutEffect to set headerRight when the screen is loaded
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Navigates back to Home screen
          style={styles.homeButton}
        >
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} color="#D32F2F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242830',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 5,
    marginRight: 10, // Right padding to align the button with other header elements
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
