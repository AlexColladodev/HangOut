import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import BASE_URL from '../config_ip';

const Review = ({ reviewId }) => {
  const [review, setReview] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch review data
    axios.get(`${BASE_URL}/reviews/${reviewId}`)
      .then(response => {
        setReview(response.data);
        // Fetch user data
        return axios.get(`${BASE_URL}/usuario_generico/${response.data.id_usuario}`);
      })
      .then(response => {
        setUserName(response.data.nombre_usuario);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [reviewId]);

  if (!review || !userName) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.date}>{review.fecha}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Calificación:</Text>
        <Text style={styles.ratingValue}>{review.calificacion}</Text>
      </View>
      <Text style={styles.message}>{review.mensaje}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#000',
  },
  ratingValue: {
    fontSize: 14,
    color: '#f39c12',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});

export default Review;
