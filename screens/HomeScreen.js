import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import styles from '../styles/styles';
import Header from '../components/header';
import { TMDB_API_KEY } from '@env';

console.log("TMDB_API_KEY:", TMDB_API_KEY);

export default function HomeScreen({ navigation }){
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
          const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();

          if (data && data.results) {
              setResults(data.results);
              setShowResults(true);
              navigation.navigate('Search Results', {
                query: searchQuery,
                results: data.results
              });
          } else {
              Alert.alert('No results found');
          }
        } catch (error) {
          Alert.alert('Error fetching results', error.message);
        } finally {
          setLoading(false);
        }
    };
  
    return(
        <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Header />
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search YourFlix"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Button title="Search" onPress={handleSearch} color="#D32F2F" />
            {loading && <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />}
          </View>
        </SafeAreaView>
      </View>
    );
}