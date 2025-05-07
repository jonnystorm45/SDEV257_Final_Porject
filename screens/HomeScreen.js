import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
      // Image taken from:
      // https://www.pexels.com/photo/person-choosing-a-videotape-from-different-titles-9807293/
      <ImageBackground
          source={ require('../assets/images/splash_background.jpg') }
          resizeMode='cover'
          style={ styles.container }
          imageStyle={ styles.imageBackground }
      >
        <LinearGradient
          colors={[ '#242830', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.6 }}
          style={ StyleSheet.absoluteFill }
        />
        <Text style={styles.title}>Welcome to YourFlix!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start Searching Movies</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#242830',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20, // Adds space between the title and button
  },
  imageBackground: {
    opacity: 0.2
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D32F2F'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    textAlign: 'center',
  }
});
