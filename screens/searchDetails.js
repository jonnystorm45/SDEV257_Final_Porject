import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, 
    ActivityIndicator, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle,
    withTiming, withDelay, Easing } from "react-native-reanimated";
import axios from 'axios';

export default function SearchDetails({ route, navigation }) {
    const { movieId } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // Animation constants
    const translateYTitle = useSharedValue(1000);
    const translateYPoster = useSharedValue(1000);
    const translateYOverview = useSharedValue(1000);
    const opacityTitle = useSharedValue(0);
    const opacityPoster = useSharedValue(0);
    const opacityOverview = useSharedValue(0);

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

       // Animation logic
       translateYTitle.value = withTiming(0, {
            duration: 600,
            easing: Easing.out(Easing.exp)
       });
       opacityTitle.value = withTiming(1, {
            duration: 3000,
            easing: Easing.out(Easing.exp)
        });

       translateYPoster.value = withDelay(
            100, withTiming(0, {
                duration: 600,
                easing: Easing.out(Easing.exp)
            })
       );
       opacityPoster.value = withDelay(
            100, withTiming(1, {
                duration: 3000,
                easing: Easing.out(Easing.exp)
            })
        );

       translateYOverview.value = withDelay(
            200, withTiming(0, {
                duration: 600,
                easing: Easing.out(Easing.exp)
            })
       );
       opacityOverview.value = withDelay(
            200, withTiming(1, {
                duration: 3000,
                easing: Easing.out(Easing.exp)
            })
        );

    }, [movieId]);

    // Animation styles

    const animatedStyleTitle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateYTitle.value }],
            opacity: opacityTitle.value
        };
    });

    const animatedStylePoster = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateYPoster.value }],
            opacity: opacityPoster.value
        };
    });

    const animatedStyleOverview = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateYOverview.value }],
            opacity: opacityOverview.value
        };
    });



    // Use useLayoutEffect to set the headerRight button
      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPressOut={() => navigation.popToTop()} // Navigates back to Home screen
              style={styles.homeButton}
            >
              <Text style={styles.homeButtonText}>Home</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

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
            <ScrollView>
                <Animated.Text style={[ styles.title, animatedStyleTitle ]}>
                    {movie.title}
                </Animated.Text>
                <Animated.Image 
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
                    style={[ styles.poster, animatedStylePoster ]}
                />
                <Animated.Text style={[ styles.overview, animatedStyleOverview ]}>
                    {movie.overview}
                </Animated.Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex:1, 
        backgroundColor: '#242830',
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10,
        color: "#fff",
    },
    poster: { 
        width: '100%', 
        height: 475, 
        resizeMode: 'contain', 
        marginVertical: 20 },
    overview: { 
        fontSize: 16,
        color: "#fff" 
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