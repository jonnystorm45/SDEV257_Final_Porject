import React from 'react';
import { Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

export default function SearchResults({ route }){
  const { query, results } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Showing results for: {query}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.resultText}>{item.title}</Text>
        )}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}

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
