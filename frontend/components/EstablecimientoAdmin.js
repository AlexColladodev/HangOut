import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BASE_URL from '../config_ip';

const EstablecimientoAdmin = ({ id, onPress }) => {
    const [data, setData] = useState(null);
    const [rating, setRating] = useState(null);
    const [numReviews, setNumReviews] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/establecimientos/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });

        axios.get(`${BASE_URL}/establecimientos/rating/${id}`)
            .then(response => {
                setRating(response.data.media);
                setNumReviews(response.data.n_reviews);
            })
            .catch(error => {
                console.error("Error fetching rating: ", error);
            });
    }, [id]);

    if (!data || rating === null || numReviews === null) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const ambientes = data.ambiente.join(', ');

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={styles.image} />
            <View style={styles.ratingContainer}>
                <Image source={require('../assets/star.png')} style={styles.starImage} />
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{data.nombre_establecimiento}</Text>
                <Text style={styles.ambience}>{ambientes}</Text>
            </View>
            <Text style={styles.numReviewsText}>{`${numReviews} valoraciones`}</Text>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = width * 0.8;

const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: 'white',
        margin: 20,
        alignItems: 'flex-start',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        padding: 10,
    },
    name: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    ambience: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 20,
    },
    ratingContainer: {
        position: 'absolute',
        top: 120,
        right: 10,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starImage: {
        width: 65,
        height: 60,
        position: 'absolute',
    },
    ratingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 0,
    },
    numReviewsText: {
        fontSize: 12,
        color: 'grey',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default EstablecimientoAdmin;