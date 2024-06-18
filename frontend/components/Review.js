import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import BASE_URL from '../config_ip';

const Review = ({ id }) => {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/reviews/${id}`)
      .then(response => {
        setReviewData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!reviewData) {
    return <Text>Loading...</Text>;
  }

  const { review, nombre_usuario } = reviewData;
  const formattedDate = format(new Date(review.fecha_creacion), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{nombre_usuario}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
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
    width: 300,
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
