import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale for moment

const DEFAULT_IMAGE_URL = 'http://10.133.133.241:5000/_uploads/photos/default_no_image.png';

const Evento = ({ id }) => {
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEvento = async () => {
    try {
      const response = await axios.get(`http://10.133.133.241:5000/eventos/${id}`);
      const eventData = response.data;

      // Convert the date to a human-readable format
      if (eventData.fecha_evento && eventData.fecha_evento.$date) {
        eventData.fecha_evento = moment(eventData.fecha_evento.$date).locale('es').format('D [de] MMMM [de] YYYY');
      }

      setEvento(eventData);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchEvento();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos del evento</Text>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontraron datos para el evento</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: evento.imagen_url || DEFAULT_IMAGE_URL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre} numberOfLines={1} ellipsizeMode="tail">{evento.nombre_evento || 'Nombre no disponible'}</Text>
        <Text style={styles.fecha}>{evento.fecha_evento || 'Fecha no disponible'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250, // Adjust width for horizontal display
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Center align the text
    width: '100%',
    marginTop: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text
    width: '100%',
  },
  fecha: {
    fontSize: 16,
    textAlign: 'center', // Center align the text
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Evento;
