import React from 'react';
import { View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
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
        <Button 
          title="Start Searching Movies" 
          onPress={() => navigation.navigate('Search')} 
          color="#D32F2F"
        />
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
});
