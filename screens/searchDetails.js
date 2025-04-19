import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function SearchDetails({ route }) {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get movie detials by id on clicked button
    useEffect(() => {
       const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params: {
                    api_key: 'a26e3dac04c2a60d0203f8f0ea97a8e7',
                },
            });
            setMovie(response.data);
        } catch (err){
            console.log ('Error fetching movie details:', err.message);
        } finally {
            setLoading(false);
        }
       };
       fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' />
                <Text>Loading details...</Text>
            </View>
        );
    }
    if (!movie) {
        return (
            <View style={styles.center}>
                <Text>Movie not found.</Text>
            </View>
        );
    }

    return (
        // Movie details container
        <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
            style={styles.poster}
            />
            <ScrollView>
            <Text style={styles.overview}>{movie.overview}</Text>
            </ScrollView>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: { flex:1, padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    poster: { width: '100%', height: 475, resizeMode: 'contain', marginVertical: 20 },
    overview: { fontSize: 16 },
  });