import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const SearchResults = ({ query, results, goBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Showing results for: {query}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.resultText}>{item.title}</Text>
        )}
        style={{ marginTop: 20 }}
      />
      <Button title="Back" onPress={goBack} color="#D32F2F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242830',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },
});

export default SearchResults;
