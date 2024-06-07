import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import BASE_URL from '../config_ip';

const ReviewUsuario = ({ reviewId }) => {
  const [review, setReview] = useState(null);
  const [userName, setUserName] = useState('');
  const [nombreEstablecimiento, setNombreEstablecimiento] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {

        const reviewResponse = await axios.get(`${BASE_URL}/reviews/${reviewId}`);
        const reviewData = reviewResponse.data;
        setReview(reviewData);


        const userResponse = await axios.get(`${BASE_URL}/usuario_generico/${reviewData.id_usuario}`);
        setUserName(userResponse.data.nombre_usuario);


        const establecimientoResponse = await axios.get(`${BASE_URL}/establecimientos/${reviewData.id_establecimiento}`);
        setNombreEstablecimiento(establecimientoResponse.data.nombre_establecimiento);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reviewId]);

  if (!review || !userName || !nombreEstablecimiento) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.establecimiento}>{nombreEstablecimiento}</Text>
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
  establecimiento: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default ReviewUsuario;
