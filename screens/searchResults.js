import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function SearchResults({ route, navigation }) {
  const { query } = route.params || {}; // Ensure query exists
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchResults = async () => {
    if (!query || query.trim() === '') {
      setError('Search query is empty.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending API request with query:', query);
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'a26e3dac04c2a60d0203f8f0ea97a8e7', // Make sure this is valid
          query: query,
        },
      });

      console.log('API response:', JSON.stringify(response.data, null, 2)); // Debug log

      if (response.data && response.data.results) {
        setResults(response.data.results);
      } else {
        setError('No results found.');
      }
      setLoading(false);
    } catch (err) {
      console.log('API error:', err.response?.data || err.message); // Log actual error
      setError('Something went wrong, please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Search query received:', query); // Log query
    fetchSearchResults();
  }, [query]);

  // Use useLayoutEffect to set the headerRight button
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text>Loading results...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for: {query}</Text>

      {results.length === 0 ? (
        <Text>No results found.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieCard} onPress={() => navigation.navigate('SearchDetails', { movieId: item.id })}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              {/* If you want to show images later: */}
              {/* <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} /> */}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movieCard: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
  },
  error: {
    fontSize: 18,
    color: '#D32F2F',
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
