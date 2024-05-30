import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Establecimiento = () => {
  const [data, setData] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/establecimientos/6658a62cc51f1596f5e940b7')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });

    axios.get('http://10.133.133.241:5000/establecimientos/rating/6658a5f3c51f1596f5e940b6')
      .then(response => {
        setRating(response.data.media);
      })
      .catch(error => {
        console.error("Error fetching rating: ", error);
      });
  }, []);

  if (!data || rating === null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Separar los ambientes por comas
  const ambientes = data.ambiente.join(', ');

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imagen_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{data.nombre_establecimiento}</Text>
        <Text style={styles.ambience}>{ambientes}</Text>
      </View>
      <View style={styles.ratingStar}>
        <Image source={require('../assets/star.png')} style={styles.starImage} />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white',
    margin: 20,
    alignItems: 'left',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    alignItems: 'left',
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
  ratingStar: {
    position: 'absolute',
    bottom: 85,
    right: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starImage: {
    width: 60,
    height: 60,
    position: 'absolute',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Establecimiento;
